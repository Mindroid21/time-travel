import { Injectable, Logger, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITimer, TIMER_STATUS } from '../models/timer.model';
import { IDisplayUser } from '../../auth/models/user.model';

@Injectable()
export class TimerService {
    private logger: Logger;

    constructor (
        @InjectModel('Timer') private readonly timerModel: Model<ITimer>        
    ) { 
        this.logger = new Logger ('TimerService');
    }

    /**
     * Check if title exists in timer records and return
     * REQUIRED - for searching timer by title
     * @param title 
     */
    async getTimerByTitle (user: IDisplayUser, title: string): Promise<boolean> {
        return await this.timerModel.find({createdBy: user.id, title: title});
    }

    /**
     * Get all timer records, status = active / completed
     * Requires - Session ID*
     * @param {IDisplayUser} user
     * @returns Promise<any>
     */
    async getAllTimers (user: IDisplayUser): Promise<any> {
        // this.logger.verbose(`User details is: ${JSON.stringify(user)}`);        
        return await this.timerModel.find({createdBy: user.id});            
    }

    /**
     * Get a specific timer record by id
     * @param {string} id
     * @returns Promise<any>
     */
    async getTimerById (id: string): Promise<any> {
        try {
            return await this.timerModel.find({_id: id});            
        } catch (err) {
            throw new BadRequestException(`Invalid Timer ID`);
        }
    }

    /**
     * Add a new record to Timer model
     * @param {ITimer} timer
     * @returns Promise<string> id of the record created     
     */
    async addTimer (timer: ITimer): Promise<string> {
        const { title, createdBy, description, isTask, sDate, eDate, status } = timer;
        try {
            const newRecord = new this.timerModel({
                title: title.toLowerCase(),
                createdBy,
                description,
                isTask,
                sDate,
                eDate,                
                status
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
     * @param {ITimer} timer 
     * @returns Promise<string> id of the record updated
     */
    async updateTimerById (id: string, timer: ITimer): Promise<string> {
        const { title, createdBy, description, isTask, sDate, eDate, status } = timer;
        if (!Object.values(TIMER_STATUS).includes(timer.status)) {
            throw new BadRequestException('Status not available');
        }
        const record = await this.timerModel.findOneAndUpdate({_id: id}, {
            title: title.toLowerCase(),
            createdBy,
            description,
            isTask,
            sDate,
            eDate,                
            status
        }, { new: true });
        return record.id;
    }

    /**
     * Delete existing record by id
     * @param id 
     * @returns Promise<any>
     */
    async deleteTimerById (id: string): Promise<any> {
        try {
            return await this.timerModel.deleteOne({_id: id});
        } catch (err) {
            throw new BadRequestException(`Invalid Timer ID`);
        }
    }
    
}