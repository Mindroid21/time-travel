import { Controller, Get, UseGuards, Query, ValidationPipe, Put, Body, Post, Param, Delete, Logger, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation } from '@nestjs/swagger';
// custom
import { GetUser } from '../../auth/decorators/auth.decorators';
import { IDisplayUser } from '../../auth/models/user.model';
import { GroupsService } from '../services/groups.service';
import { GroupDetailsDto, GroupParamIdDto } from '../dto/groups.dto';

@Controller('groups')
export class GroupsController {
    private logger: Logger;

    constructor(private groupService: GroupsService) {
        this.logger = new Logger('GroupsController');
    }

    @Get()
    @ApiOperation({ title: 'Get all FREE (Non Premium) Groups. This API returns non premium list of Groups' })
    async getFilteredGroups (): Promise<any> {
        return this.groupService.filterGroupsWithoutPremium();
    }

    @Get('/all')
    @ApiOperation({ title: 'Get all Groups. This api returns both premium & non list of Groups. *Requires Session Token' })
    @UseGuards(AuthGuard())
    async getAllGroups (@GetUser() user: IDisplayUser): Promise<any> {
        return this.groupService.getAllGroups(user);
    }

    @Get('/details/:id')
    @ApiOperation({ title: 'Get specific Group details by its id. *Requires Session Token' })
    @UseGuards(AuthGuard())
    async getGroupById (@Param(ValidationPipe) param: GroupParamIdDto): Promise<any> {
        const { id } = param;
        return this.groupService.getGroupById(id);
    }

    @Post('/add')
    @ApiOperation({ title: 'Create New Group. *Requires Session Token' })
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    async addNewGroup (@Body() groupDetailsDto: GroupDetailsDto): Promise<string> {
        return this.groupService.addGroup(groupDetailsDto);
    }

    @Put('/update/:id')
    @ApiOperation({ title: 'Update Existing Group details by its id. *Requires Session Token' })
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    async updateGroupById (
        @Param('id') id: string, 
        @Body() groupDetailsDto: GroupDetailsDto): Promise<string> {
            return this.groupService.updateGroupById(id, groupDetailsDto);
    }

    @Delete('/delete/:id')
    @ApiOperation({ title: 'Delete Existing Group details by its id. *Requires Session Token' })
    async deleteGroupById (@Param(ValidationPipe) param: GroupParamIdDto): Promise <string> {
        const { id } = param;
        return this.groupService.deleteGroupById(id);
    }
}
