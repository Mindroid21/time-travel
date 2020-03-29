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
 * ENUM For Timer TYPE
 */
export enum TIMER_TYPE {
    UNTIL = 'until',
    SINCE = 'since',
    FROM_TO = 'fromTo',
};

/**
 * Response Object DataType
 */
export interface ITimerResponse {
    id?: string;
    createdBy: IDisplayUser;
    status: TIMER_STATUS;
    title: string;    
    description: string;
    type: TIMER_TYPE;
    timeDate: Date[];
    link: string;
}

/**
 * Model Interface of ITimer
 */
export interface ITimer {
    id?: string;
    createdBy: string;
    status: TIMER_STATUS;
    title: string;    
    description: string;
    type: TIMER_TYPE;
    timeDate: Date[];
    link: string;
}

/**
 * Schema Export of Timer
 */
export const TimerSchema = new Schema ({
    createdBy: {
        type: String,
        required: 'Require User ID who has started the timer'
    }, 
    status: {
        type: String,
        required: 'Provide status of the timer',
        default: TIMER_STATUS.ACTIVE
    },
    title: {
        type: String,
        unique: true,
        required: 'Enter the Title of the Timer'
    }, 
    description: {
        type: String,
    },
    type: {
        type: String,
        required: 'Should be of type - UNTIL, SINCE, FROMTO'
    },
    timeDate: {
        type: Array,
        required: 'Provide Start Date of Timer',
        default: [Date.now()]
    },
    link: {
        type: String,        
        required: 'Provide a link to task / some article / image',
        default: 'https://timely-travel.herokuapp.com/'
    },
});