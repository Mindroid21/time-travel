import { Schema } from 'mongoose';
import { IDisplayUser } from './../../auth/models/user.model';

/**
 * Timer Status ENUM - to be mapped to status field
 */
export enum TIMER_STATUS {
    ACTIVE = 'active',
    COMPLETED = 'completed'
};

/**
 * Response Object DataType
 */
export interface ITimerResponse {
    id?: string;
    title: string;    
    createdBy: IDisplayUser;
    description: string;
    isTask: boolean;
    sDate: number;
    eDate: number;
    status: TIMER_STATUS;
    link: string;
}

/**
 * Model Interface of ITimer
 */
export interface ITimer {
    id?: string;
    title: string;    
    createdBy: string;
    description: string;
    isTask: boolean;
    sDate: number;
    eDate: number;
    status: TIMER_STATUS;
    link: string;
}

/**
 * Schema Export of Timer
 */
export const TimerSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: 'Enter the Title of the song'
    },
    createdBy: {
        type: String,
        required: 'Require User ID who has started the draft'
    },    
    description: {
        type: String,
    },
    isTask: {
        type: Boolean,
        required: true,
        default: false
    },
    sDate: {
        type: Number,
        required: 'Provide Start Date of Timer',
        default: Date.now()
    },
    eDate: {
        type: Number,
        required: 'Provide End Date of Timer',
        default: Date.now()
    },
    status: {
        type: String,
        required: 'Provide status of the timer',
        default: TIMER_STATUS.ACTIVE
    },
    link: {
        type: String,        
        required: 'Provide a link to task / some article / image',
        default: 'https://timely-travel.herokuapp.com/'
    },
});