import { Controller, Logger, Get, UseGuards, ValidationPipe, Post, Body, Put, Param, Delete, UsePipes, BadRequestException, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
// custom
import { TimerService } from '../services/timer.service';
import { GetUser } from '../../auth/decorators/auth.decorators';
import { IDisplayUser } from '../../auth/models/user.model';
import { TimerParamIdDto, TimerDetailsDto, MarkdownContentDto } from '../dto/timer.dto';
import { TIMER_STATUS, ITimerResponse, TIMER_TYPE } from '../models/timer.model';
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
            createdBy: {firstName: '', lastName: '', username: '', role: USER_ROLES.FREE},
            title: '',
            selected: false,
            description: '',
            timeDate: '',
            type: TIMER_TYPE.SINCE,
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
            let timerItem: ITimerResponse = this.resetTimerResponse();                    
                // Fetching user
                timerItem.createdBy = await this.fetchUserDetails(item.createdBy);                
                // Fetch remaining details
                timerItem.id = item['_id'];
                timerItem.title = item.title;
                timerItem.description = item.description;
                timerItem.selected = item.selected;
                timerItem.type = item.type;
                timerItem.timeDate = item.timeDate;
                timerItem.status = item.status;     
                timerItem.link = item.link;           
                return timerItem;
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
                const timerItem: ITimerResponse = await this.fetchDataItemFromSchemas(item);
                return timerItem;
            }));            
        } catch (err) {
            this.logger.verbose(`Error fetching data: `, err);
            return resultList;            
        }
    }

    @Get('/checkTitle')
    @ApiOperation({ title: 'Check if Title already exists reated by the user before. *Requires Session Token' })
    @UseGuards(AuthGuard())
    async checkTitleExists(@GetUser() user: IDisplayUser, @Query('title') title: string): Promise<boolean> {
        const result = await this.timerService.checkTitleExists(user, title.trim().toLowerCase());
        if (result) {
            this.logger.verbose(`Title exists - ${title}`);
            return true;
        } else {
            this.logger.verbose(`Title does not exists - ${title}`);
            return false;
        }
    }
    

    @Get()
    @ApiOperation({ title: 'Get all Timer records. *Requires Session Token' })
    @UseGuards(AuthGuard())
    async getAllTimers (@GetUser() user: IDisplayUser): Promise<any> {
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
    async getTimerById (@Param(ValidationPipe) param: TimerParamIdDto): Promise<any> {
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
            throw new BadRequestException(`Error fetching record from Timer Table - ${JSON.stringify(err)}`);
        }        
    }

    @Post('/add')
    @ApiOperation({ title: 'Creates a new record of the Timer. *Requires Session Token' })
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    async addNewTimer (
            @Body() timerDetailsDto: TimerDetailsDto, 
            @GetUser() user: IDisplayUser 
    ): Promise<string> {
        const { title, description, link, timeDate, type, selected, status } = timerDetailsDto;
        // this.logger.verbose(`Timer controller payload is: ${JSON.stringify(timerDetailsDto)}`);
        this.logger.verbose(`..................................................................`);
        return this.timerService.addTimer({
            createdBy: user.id,
            title,
            description,
            selected,
            link,
            status,
            type,
            timeDate, 
        });
    }

    @Put('/update/:id')
    @ApiOperation({ title: 'Update existing timer record by its id. *Requires Session Token' })
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    async updateTimerById (
        @Param('id') id: string,         
        @Body() timerDetailsDto: TimerDetailsDto,
        @GetUser() user: IDisplayUser
    ): Promise<string> {
        const { title, description, link, timeDate, type, selected, status } = timerDetailsDto;
        return this.timerService.updateTimerById(id, {
            createdBy: user.id,
            title,
            description,
            selected,
            link,
            status,
            type,
            timeDate, 
        });
    }

    @Put('/updateSelected/:id/:status')
    @ApiOperation({ title: 'Update existing timer record isSelected field by its id. *Requires Session Token' })
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    async updateTimerSelectedById (
        @Param('id') id: string,         
        @Param('status') status: boolean,
        @GetUser() user: IDisplayUser
    ): Promise<string> {
            return this.timerService.updateTimerSelectedById(id, status);
    }

    @Delete('/delete/:id')
    @ApiOperation({ title: 'Delete existing timer record. *Requires Session Token' })
    @UseGuards(AuthGuard())
    async deleteTimerById (@Param(ValidationPipe) param: TimerParamIdDto): Promise <string> {
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