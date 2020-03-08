import { Schema } from 'mongoose';

export interface IGroup {
    id?: string;
    title: string;
    slug: string;
    description: string;
    premium: boolean;
}

export const GroupSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: 'Enter group title'
    },
    slug: {
        type: String,
        unique: true,
        required: 'Enter group slug'
    },    
    description: {
        type: String,
        required: 'Provide group description'
    },
    // premium true is only made available for subscribed users
    premium: {
        type: Boolean,
        required: 'Is the record Public or Private'
    }
});