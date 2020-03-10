import { Injectable, Logger, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// custom
import { IQuote } from './../models/quotes.model';

@Injectable()
export class QuoteService {
    private logger: Logger;

    constructor (
        @InjectModel('Quote') private readonly quoteModel: Model<IQuote>
    ) { 
        this.logger = new Logger ('TagService');
    }

    /**
     * Returns all quotes
     * @returns Promise<any>
     */
    async getAllQuotes (): Promise<any> {
        return await this.quoteModel.find({});
    }

    /**
     * Get a specific quote record by id
     * @param {string} id
     * @returns Promise<any>
     */
    async getQuoteById (id: string): Promise<any> {
        try {
            return await this.quoteModel.find({_id: id});
        } catch (err) {
            throw new BadRequestException(`Invalid Quote ID`);
        }
    }

    /**
     * Add a new record to Tag model
     * @param {IQuote} tag
     * @returns Promise<string> id of the record created
     */
    async addQuote (quote: IQuote): Promise<string> {
        const { title, description } = quote;
        try {
            const newRecord = new this.quoteModel ({
                title,
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
     * @param {IQuote} tag
     * @returns Promise<string> id of the record updated
     */
    async updateQuoteById (id: string, quote: IQuote): Promise<string> {
        const { title, description } = quote;
        const record = await this.quoteModel.findOneAndUpdate({_id: id}, {
            title, description
        }, { new: true });
        return record.id;
    }

    /**
     * Delete existing record by id
     * @param id 
     * @returns Promise<any>
     */
    async deleteQuoteById (id: string): Promise<any> {
        return await this.quoteModel.deleteOne({_id: id});
    }

}
