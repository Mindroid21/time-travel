import { Schema } from 'mongoose';
import { USER_ROLES, USER_STATUS } from './../constants/';

export interface IDisplayUser {
    id?: string;
    firstName: string;
    lastName: string;    
    username: string;
    role?: string;
    status?: string;
    draftCount?: number;
    playlistCount?: number;
}

export interface IUser extends IDisplayUser {    
    password: string;    
    salt: string;
}

export const UserSchema = new Schema({
    firstName: {
        type: String,
        required: 'First name is required'
    },
    lastName: {
        type: String,
        required: 'Last name is required'
    },    
    username: {
        type: String,
        required: 'Username / email is required'
    },
    password: {
        type: String,
        required: 'Password is required'
    },
    role: {
        type: String,
        default: USER_ROLES.FREE
    },
    status: {
        type: String,
        default: USER_STATUS.INACTIVE
    },
    salt: {
        type: String,
        required: 'Salt is required',
    },
    draftCount: {
        type: Number,
        default: 3
    },
    playlistCount: {
        type: Number,
        default: 3
    }
});