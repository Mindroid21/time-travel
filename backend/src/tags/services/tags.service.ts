import { Injectable, Logger, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// custom
import { ITag } from './../models/tags.model';

@Injectable()
export class TagsService {
    private logger: Logger;

    constructor (
        @InjectModel('Tag') private readonly tagModel: Model<ITag>
    ) { 
        this.logger = new Logger ('TagService');
    }

    /**
     * Returns all tags
     * @returns Promise<any>
     */
    async getAllTags (): Promise<any> {
        return await this.tagModel.find({});
    }

    /**
     * Get a specific tag record by id
     * @param {string} id
     * @returns Promise<any>
     */
    async getTagById (id: string): Promise<any> {
        try {
            return await this.tagModel.find({_id: id});
        } catch (err) {
            throw new BadRequestException(`Invalid Tag ID`);
        }
    }

    /**
     * Add a new record to Tag model
     * @param {ITag} tag
     * @returns Promise<string> id of the record created
     */
    async addTag (tag: ITag): Promise<string> {
        const { name, description } = tag;
        try {
            const newRecord = new this.tagModel({
                name,
                description
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
     * @param {ITag} tag
     * @returns Promise<string> id of the record updated
     */
    async updateTagById (id: string, tag: ITag): Promise<string> {
        const { name, description } = tag;
        const record = await this.tagModel.findOneAndUpdate({_id: id}, {
            name, description
        }, { new: true });
        return record.id;
    }

    /**
     * Delete existing record by id
     * @param id 
     * @returns Promise<any>
     */
    async deleteTagById (id: string): Promise<any> {
        return await this.tagModel.deleteOne({_id: id});
    }

}
