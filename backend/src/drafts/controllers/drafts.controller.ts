import { Controller, Logger, Get, UseGuards, ValidationPipe, Post, Body, Put, Param, Delete, UsePipes, BadRequestException, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
// custom
import { DraftService } from './../services/drafts.service';
import { GetUser } from '../../auth/decorators/auth.decorators';
import { IDisplayUser } from '../../auth/models/user.model';
import { DraftParamIdDto, DraftDetailsDto, MarkdownContentDto } from '../dto/drafts.dto';
import { ArtistsService } from '../../artists/services/artists.service';
import { GroupsService } from '../../groups/services/groups.service';
import { TagsService } from '../../tags/services/tags.service';
import { DRAFT_STATUS, IDraftResponse } from '../models/drafts.model';
import { USER_ROLES } from '../../auth/constants';
import { AuthService } from '../../auth/services/auth.service';
import  converter  from './../lib/showdown-converter';

@Controller('drafts')
export class DraftController {
    private logger: Logger;    

    constructor (
        private draftService: DraftService,
        private artistService: ArtistsService,
        private groupService: GroupsService,
        private tagService: TagsService,
        private userService: AuthService 
        ) {
        this.logger = new Logger('DraftController');
    }

    /**
     * private method to reset all fields
     */
    private resetDraftResponse(): IDraftResponse {
        const item: IDraftResponse = {
            id:'',
            title: '',
            artist: {name: '', url: '', year: ''},
            content: '',
            createdBy: {firstName: '', lastName: '', username: '', role: USER_ROLES.FREE},
            updatedBy: {firstName: '', lastName: '', username: '', role: USER_ROLES.FREE},
            date: Date.now(),
            description: '',
            groups: [],
            links: [],
            status: DRAFT_STATUS.NEW,
            tags: [],            
            };
        return item;
    }

    /**
     * private method to get all group records by ID
     * @param groups
     * @param draftObject
     */
    private fetchGroupFields(groups:any, draftObject: IDraftResponse): IDraftResponse {
        try {
            groups.map(async item02 => {
                const result = await this.groupService.getGroupById(item02);
                if (result && result.length > 0) draftObject.groups.push(result[0]); // Watch out while debugging
            });
            return draftObject;
        } catch(err) {
            this.logger.verbose(`Error fetching group record: `, err);
            return draftObject;
        }
    }

    /**
     * private method to get all tag records by ID
     * @param tags 
     * @param draftObject 
     */
    private fetchTagFields(tags:any, draftObject: IDraftResponse): IDraftResponse {
        try {
            tags.map(async item02 => {
                const result = await this.tagService.getTagById(item02);
                if (result && result.length > 0) draftObject.tags.push(result[0]); // Watch out while debugging
            });
            return draftObject;
        } catch(err) {
            this.logger.verbose(`Error fetching tag record: `, err);
            return draftObject;
        }
    }
    
    /**
     * private methods to get artist by ID
     * @param artist
     * @param draftObject
     */
    private async fetchArtistById(artist:string, draftObject: IDraftResponse): Promise<IDraftResponse> {
        try {
            const result = await this.artistService.getArtistById(artist);
            draftObject.artist = result;
            return draftObject;
        } catch (err) {
            this.logger.verbose(`Error fetching artist record: `, err);
            return draftObject;
        }
    }

    /**
     * private methods to get artist by ID
     * @param artist
     * @param draftObject
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
            let draftItem: IDraftResponse = this.resetDraftResponse();                    
                // this.logger.verbose(`Reset Item is: ${item}`);
                // Fetching groups
                if(item.groups && item.groups.length > 0) {
                    draftItem = this.fetchGroupFields(item.groups, draftItem);
                }
                // Fetching tags
                if(item.tags && item.tags.length > 0) {
                    draftItem = this.fetchTagFields(item.tags, draftItem);
                }
                // Fetching artist
                if(item.artist) {
                    draftItem = await this.fetchArtistById(item.artist, draftItem);
                }
                // Fetching user
                draftItem.createdBy = await this.fetchUserDetails(item.createdBy);
                draftItem.updatedBy = await this.fetchUserDetails(item.updatedBy);
                
                // Fetch remaining details
                draftItem.id = item['_id'];
                draftItem.title = item.title;
                draftItem.description = item.description;
                draftItem.links = item.links;
                draftItem.status = item.status;
                draftItem.content = item.content;                
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
                let draftItem: IDraftResponse = this.resetDraftResponse();                    
                draftItem = await this.fetchDataItemFromSchemas(item);
                return draftItem;
            }));            
        } catch (err) {
            this.logger.verbose(`Error fetching data: `, err);
            return resultList;            
        }
    }

    @Get('/checkTitle')
    @ApiOperation({ title: 'Check if Title already exists' })
    async checkTitleExists(@Query('title') title: string): Promise<boolean> {
        const result = await this.draftService.checkTitleExists(title.trim());
        if (result) {
            this.logger.verbose(`Title exists - ${title}`);
            return true;
        } else {
            this.logger.verbose(`Title does not exists - ${title}`);
            return false;
        }
    }


    @Get()
    @ApiOperation({ title: 'Get all Drafts. *Requires Session Token' })
    @UseGuards(AuthGuard())
    async getAllDrafts (@GetUser() user: IDisplayUser): Promise<any> {
        const resultList = await this.draftService.getAllDrafts(user);         
        if (resultList && resultList.length > 0) {
            return await this.fetchDataListFromSchemas(resultList);
        } else {
            this.logger.verbose(`Returning empty array`);
            return resultList;
        }
    }

    @Get('/details/:id')
    @ApiOperation({ title: 'Get specific Draft details by its id. *Requires Session Token' })
    @UseGuards(AuthGuard())
    async getDraftById (@Param(ValidationPipe) param: DraftParamIdDto): Promise<any> {
        const { id } = param;
        try {
            const resultList = await this.draftService.getDraftById(id);
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
    @ApiOperation({ title: 'Creates a new record of the song as a draft. *Requires Session Token' })
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    async addNewDraft (@Body() draftDetailsDto: DraftDetailsDto): Promise<string> {                     
        return this.draftService.addDraft(draftDetailsDto);
    }

    @Put('/update/:id')
    @ApiOperation({ title: 'Update Existing song record saved as a draft. *Requires Session Token' })
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    async updateDraftById (
        @Param('id') id: string,         
        @Body() draftDetailsDto: DraftDetailsDto): Promise<string> {
            return this.draftService.updateDraftById(id, draftDetailsDto);
    }

    @Delete('/delete/:id')
    @ApiOperation({ title: 'Delete Existing song record saved as a draft. *Requires Session Token' })
    @UseGuards(AuthGuard())
    async deleteDraftById (@Param(ValidationPipe) param: DraftParamIdDto): Promise <string> {
        const { id } = param;
        return this.draftService.deleteDraftById(id);
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