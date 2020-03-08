import { Schema } from 'mongoose';

export interface IArtist {
    id?: string;
    name: string;
    url: string;
    year: string;
}

export const ArtistSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: 'Enter Artist Name'
    },
    url: {
        type: String,
        required: 'Enter the URL of Artist\'s Image'
    },
    year: {
        type: String,
        required: 'Enter the year of Birth for the Artist'
    }
});