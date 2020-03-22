import { Controller, Logger, Get, UseGuards, ValidationPipe, Post, Body, Put, Param, Delete, UsePipes, BadRequestException, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
// custom
import { TimerService } from '../services/timer.service';
import { GetUser } from '../../auth/decorators/auth.decorators';
import { IDisplayUser } from '../../auth/models/user.model';
import { TimerParamIdDto, TimerDetailsDto, MarkdownContentDto } from '../dto/timer.dto';
import { TIMER_STATUS, ITimerResponse } from '../models/timer.model';
import { USER_ROLES } from '../../auth/constants';
import { AuthService } from '../../auth/services/auth.service';
import  converter  from '../lib/showdown-converter';

@Controller('timer')
export class TimerController {
    private logger: Logger;    

    constructor (
        private timerService: TimerService,
        private userService: AuthService 
        ) {
        this.logger = new Logger('TimerController');
    }

    /**
     * private method to reset all fields
     */
    private resetTimerResponse(): ITimerResponse {
        const item: ITimerResponse = {
            id:'',
            title: '',
            description: '',
            createdBy: {firstName: '', lastName: '', username: '', role: USER_ROLES.FREE},
            sDate: Date.now(),
            eDate: Date.now(),
            isTask: false,
            isCountDown: true,
            status: TIMER_STATUS.ACTIVE,
            link: '',
            };
        return item;
    }

    /**
     * private methods to get user by ID
     * @param user
     */
    private async fetchUserDetails(userId:string): Promise<IDisplayUser> {
        try {
            const result = await this.userService.getUserById(userId);
            return result;
        } catch (err) {
            this.logger.verbose(`Error fetching user record: `, err);
            return null;
        }
    }

    private async fetchDataItemFromSchemas(item: any): Promise<any> {
        try {
            let draftItem: ITimerResponse = this.resetTimerResponse();                    
                // Fetching user
                draftItem.createdBy = await this.fetchUserDetails(item.createdBy);                
                // Fetch remaining details
                draftItem.id = item['_id'];
                draftItem.title = item.title;
                draftItem.description = item.description;
                draftItem.sDate = item.sDate;
                draftItem.eDate = item.eDate;
                draftItem.isTask = item.isTask;                
                draftItem.isCountDown = item.isCountDown;                
                draftItem.status = item.status;     
                draftItem.link = item.link;           
                return draftItem;
        } catch (err) {
            this.logger.verbose(`Error fetching details for the record: ${JSON.stringify(item)} - ${JSON.stringify(err)}`);
            return item;
        }
    }

    
    /**
     * private method to retrieve a LIST of records from other Schemas / Tables
     * @param resultList Array of records
     */
    private async fetchDataListFromSchemas(resultList: any): Promise<any> {             
        try {
            return await Promise.all(resultList.map(async item => {                 
                const draftItem: ITimerResponse = await this.fetchDataItemFromSchemas(item);
                return draftItem;
            }));            
        } catch (err) {
            this.logger.verbose(`Error fetching data: `, err);
            return resultList;            
        }
    }

    

    @Get('/getTitle')
    @ApiOperation({ title: 'Get all Timer records based on title. *Requires Session Token' })
    @UseGuards(AuthGuard())
    async checkTitleExists (@GetUser() user: IDisplayUser, @Query('title') title: string): Promise<boolean> {
        // const result = await this.timerService.checkTitleExists(title.trim());
        return await this.timerService.getTimerByTitle(user, title.trim());
    }


    @Get()
    @ApiOperation({ title: 'Get all Timer records. *Requires Session Token' })
    @UseGuards(AuthGuard())
    async getAllDrafts (@GetUser() user: IDisplayUser): Promise<any> {
        const resultList = await this.timerService.getAllTimers(user);         
        if (resultList && resultList.length > 0) {
            return await this.fetchDataListFromSchemas(resultList);
        } else {
            this.logger.verbose(`Returning empty array`);
            return resultList;
        }
    }

    @Get('/details/:id')
    @ApiOperation({ title: 'Get specific Timer record by its id. *Requires Session Token' })
    @UseGuards(AuthGuard())
    async getDraftById (@Param(ValidationPipe) param: TimerParamIdDto): Promise<any> {
        const { id } = param;
        try {
            const resultList = await this.timerService.getTimerById(id);
            if (resultList && resultList.length > 0) {
                return await this.fetchDataListFromSchemas(resultList);                
            } else {
                this.logger.verbose(`Returning empty array`);
                return resultList;
            }
        } catch (err) {
            throw new BadRequestException(`Error fetching record from Draft Table - ${JSON.stringify(err)}`);
        }        
    }

    @Post('/add')
    @ApiOperation({ title: 'Creates a new record of the Timer. *Requires Session Token' })
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    async addNewDraft (@Body() draftDetailsDto: TimerDetailsDto): Promise<string> {                     
        return this.timerService.addTimer(draftDetailsDto);
    }

    @Put('/update/:id')
    @ApiOperation({ title: 'Update existing timer record by its id. *Requires Session Token' })
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    async updateDraftById (
        @Param('id') id: string,         
        @Body() draftDetailsDto: TimerDetailsDto): Promise<string> {
            return this.timerService.updateTimerById(id, draftDetailsDto);
    }

    @Delete('/delete/:id')
    @ApiOperation({ title: 'Delete existing timer record. *Requires Session Token' })
    @UseGuards(AuthGuard())
    async deleteDraftById (@Param(ValidationPipe) param: TimerParamIdDto): Promise <string> {
        const { id } = param;
        return this.timerService.deleteTimerById(id);
    }

    @Post('/convert')
    @ApiOperation({ title: 'Convert Markdown Payload to HTML and return to client' })
    @UsePipes(ValidationPipe)
    async convertMarkdownToHtml(@Body() payload: MarkdownContentDto  ): Promise<any> {
        const { content } = payload;
        const html = converter.makeHtml(content);
        return {
            markdown: html
        };
    }
}   