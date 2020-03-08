import { Controller, Logger, Get, UseGuards, Query, ValidationPipe, Post, Body, Put, Param, Delete, UsePipes } from '@nestjs/common';
import { TagsService } from '../services/tags.service';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { TagDetailsDto, TagParamIdDto } from '../dto/tags.dto';

@Controller('tags')
export class TagsController {
    private logger: Logger;

    constructor (private tagService: TagsService) {
        this.logger = new Logger('TagController');
    }

    @Get()
    @ApiOperation({ title: 'Get all Tags. This API returns non premium list of Tag records' })
    async getAllTags (): Promise<any> {
        return this.tagService.getAllTags();
    }

    @Get('/details/:id')
    @ApiOperation({ title: 'Get specific Tag details by its id. *Requires Session Token' })
    @UseGuards(AuthGuard())
    async getTagById (@Param(ValidationPipe) param: TagParamIdDto): Promise<any> {
        const { id } = param;
        return this.tagService.getTagById(id);
    }

    @Post('/add')
    @ApiOperation({ title: 'Create New Tag. *Requires Session Token' })
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    async addNewTag (@Body() tagDetailsDto: TagDetailsDto): Promise<string> {
        return this.tagService.addTag(tagDetailsDto);
    }

    @Put('/update/:id')
    @ApiOperation({ title: 'Update Existing Tag details by its id. *Requires Session Token' })
    @UseGuards(AuthGuard())
    async updateTagById (
        @Param(ValidationPipe) param: TagParamIdDto, 
        @Body() tagDetailsDto: TagDetailsDto): Promise<string> {
            const { id } = param;
            return this.tagService.updateTagById(id, tagDetailsDto);
    }

    @Delete('/delete/:id')
    @ApiOperation({ title: 'Delete Existing Tag details by its id. *Requires Session Token' })
    @UseGuards(AuthGuard())
    async deleteTagById (@Param(ValidationPipe) param: TagParamIdDto): Promise <string> {
        const { id } = param;
        return this.tagService.deleteTagById(id);
    }
}
