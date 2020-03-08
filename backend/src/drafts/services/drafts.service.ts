import { Injectable, Logger, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDraft, DRAFT_STATUS } from '../models/drafts.model';
import { USER_ROLES } from '../../auth/constants';
import { IDisplayUser } from '../../auth/models/user.model';

@Injectable()
export class DraftService {
    private logger: Logger;

    constructor (
        @InjectModel('Draft') private readonly draftModel: Model<IDraft>        
    ) { 
        this.logger = new Logger ('DraftService');
    }

    /**
     * Check if title exists in draft records
     * @param title 
     */
    async checkTitleExists(title: string): Promise<boolean> {
        const result = await this.draftModel.find({title: title});        
        if (result && result.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Get all draft records, status = in_progress / new
     * @param {IDisplayUser} user
     * @returns Promise<any>
     */
    async getAllDrafts (user: IDisplayUser): Promise<any> {
        // this.logger.verbose(`User details is: ${JSON.stringify(user)}`);        
        if(user.role === USER_ROLES.PREMIUM || user.role === USER_ROLES.ADMIN) {
            return await this.draftModel.find({$or:[{createdBy: user.id},{updatedBy: user.id}]});            
        } else {
            throw new BadRequestException('Unauthorized request, require role - PREMIUM / ADMIN');
        }
    }

    /**
     * Get a specific group record by id
     * @param {string} id
     * @returns Promise<any>
     */
    async getDraftById (id: string): Promise<any> {
        try {
            return await this.draftModel.find({_id: id});            
        } catch (err) {
            throw new BadRequestException(`Invalid Group ID`);
        }
    }

    /**
     * Add a new record to Draft model
     * @param {IGroup} draft
     * @returns Promise<string> id of the record created     
     */
    async addDraft (draft: IDraft): Promise<string> {
        const { title, createdBy, updatedBy, artist, content, date, description, groups, links, tags } = draft;        
        try {
            const newRecord = new this.draftModel({
                title: title.toLowerCase(),
                createdBy,
                updatedBy,
                artist,
                content,
                date,
                description,
                groups,
                tags,
                links,
                status: DRAFT_STATUS.NEW
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
     * @param {IDraft} draft 
     * @returns Promise<string> id of the record updated
     */
    async updateDraftById (id: string, draft: IDraft): Promise<string> {
        const { title, createdBy, updatedBy, artist, content, date, description, groups, links, tags, status } = draft;
        if (!Object.values(DRAFT_STATUS).includes(draft.status)) {
            throw new BadRequestException('Status not available');
        }
        const record = await this.draftModel.findOneAndUpdate({_id: id}, {
            title,
            createdBy,
            updatedBy,
            artist,
            content,
            date,
            description,
            groups,
            links,
            tags,
            status
        }, { new: true });
        return record.id;
    }

    /**
     * Delete existing record by id
     * @param id 
     * @returns Promise<any>
     */
    async deleteDraftById (id: string): Promise<any> {
        try {
            return await this.draftModel.deleteOne({_id: id});
        } catch (err) {
            throw new BadRequestException(`Invalid Draft ID`);
        }
    }

    
}