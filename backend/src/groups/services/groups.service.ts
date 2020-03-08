import { Injectable, Logger, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// custom
import { IGroup } from './../models/groups.model';
import { IDisplayUser } from '../../auth/models/user.model';
import { USER_ROLES } from '../../auth/constants';

@Injectable()
export class GroupsService {
    private logger: Logger;
    constructor (
        @InjectModel('Group') private readonly groupModel: Model<IGroup>
    ) { 
        this.logger = new Logger('GroupService');
    }

    /**
     * Get all records, premium and free
     * @param {IDisplayUser} user
     * @returns Promise<any>
     */
    async getAllGroups (user: IDisplayUser): Promise<any> {
        if(user.role === USER_ROLES.PREMIUM || user.role === USER_ROLES.ADMIN) {
            return await this.groupModel.find({});
        } else {
            return await this.groupModel.find({premium: false});
        }
    }

    /**
     * Returns filtered group records, ones which are free only
     * @returns Promise<any>
     */
    async filterGroupsWithoutPremium (): Promise<any> {
        return await this.groupModel.find({premium: false});
    }

    /**
     * Get a specific group record by id
     * @param {string} id
     * @returns Promise<any>
     */
    async getGroupById (id: string): Promise<any> {
        try {
            return await this.groupModel.find({_id: id});
        } catch (err) {
            throw new BadRequestException(`Invalid Group ID`);
        }
    }

    /**
     * Add a new record to Group model
     * @param {IGroup} group
     * @returns Promise<string> id of the record created     
     */
    async addGroup (group: IGroup): Promise<string> {
        const { title, slug, description, premium } = group;
        try {
            const newRecord = new this.groupModel({
                title,
                slug,
                description,
                premium
            });
            const result = await newRecord.save();
            return result.id;
        } catch (err) {
            this.logger.verbose(`Error: ${JSON.stringify(err)}`);
            if(err.code === 11000) {                
                throw new BadRequestException(`${err.errmsg}`);
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    /**
     * Update existing record with new details
     * @param {string} id 
     * @param {IGroup} group 
     * @returns Promise<string> id of the record updated
     */
    async updateGroupById (id: string, group: IGroup): Promise<string> {
        const { title, slug, description, premium } = group;
        const record = await this.groupModel.findOneAndUpdate({_id: id}, {
            title, slug, description, premium
        }, { new: true });
        return record.id;
    }

    /**
     * Delete existing record by id
     * @param id 
     * @returns Promise<any>
     */
    async deleteGroupById (id: string): Promise<any> {
        try {
            return await this.groupModel.deleteOne({_id: id});
        } catch (err) {
            throw new BadRequestException(`Invalid Group ID`);
        }
    }
    
}
