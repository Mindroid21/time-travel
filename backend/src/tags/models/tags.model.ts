import { Schema } from 'mongoose';

export interface ITag {
    id?: string;
    name: string;    
    description: string;    
}

export const TagSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: 'Enter tag title'
    },    
    description: {
        type: String,
        unique: true,
        required: 'Provide tag description'
    }
});