import { Schema } from 'mongoose';

export interface IQuote {
    id?: string;
    title: string;    
    description: string;    
}

export const QuoteSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: 'Enter quote title'
    },    
    description: {
        type: String,
        unique: true,
        required: 'Provide quote description'
    }
});