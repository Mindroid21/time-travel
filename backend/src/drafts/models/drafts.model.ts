import { Schema } from 'mongoose';
import { IDisplayUser } from './../../auth/models/user.model';
import { ITag } from './../../tags/models/tags.model';
import { IArtist } from './../../artists/models/artists.model';
import {  IGroup } from './../../groups/models/groups.model';


/**
 * Draft Status ENUM - to be mapped to status field
 */
export enum DRAFT_STATUS {
    NEW = 'new',
    IN_PROGRESS = 'in-progress',
    SUBMITTED = 'submitted'
};

/**
 * Model Interface of IDraft
 */
export interface IDraft {
    id?: string;
    title: string;    
    createdBy: string;
    updatedBy: string;
    description: string;
    links: string[];
    content: string;
    tags: string[];
    artist: string;
    groups: string[];
    date: number;
    status: DRAFT_STATUS;
}

/**
 * Response Object DataType
 */
export interface IDraftResponse {
    id?: string;
    title: string;    
    createdBy: IDisplayUser;
    updatedBy: IDisplayUser;
    description: string;
    links: string[];
    content: string;
    tags: ITag[];
    artist: IArtist;
    groups: IGroup[];
    date: number;
    status: DRAFT_STATUS;
}

/**
 * Schema Export of Draft
 */
export const DraftSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: 'Enter the Title of the song'
    },
    createdBy: {
        type: String,
        required: 'Require User ID who has started the draft'
    },
    updatedBy: {
        type: String
    },
    description: {
        type: String,
    },
    links: [{
        type: String,                
    }],
    content: {
        type: String,        
        required: 'Provide the song content'
    },
    tags: [{
        type: String,
    }],
    artist: {
        type: String,
    },
    groups: [{
        type: String,
    }],
    date: {
        type: Number,
        required: 'Provide Date of creation / updation',
        default: Date.now()
    },
    status: {
        type: String,        
        required: 'Provide the status of the song draft'
    },
});