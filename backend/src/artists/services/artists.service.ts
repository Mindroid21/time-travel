import { Injectable, BadRequestException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IArtist } from '../models/artists.model';

@Injectable()
export class ArtistsService {
    private logger: Logger;
    constructor (
        @InjectModel('Artist') private readonly artistModel: Model<IArtist>
    ) { 
        this.logger = new Logger('ArtistsService');
    }

    /**
     * Get all Artists. Returns a list of artists
     * @returns Promise<any>
     */
    async getAllArtists(): Promise<any> {
        return await this.artistModel.find({});
    }

    /**
     * Get a specific group record by id
     * @param {string} id
     * @returns Promise<any>
     */
    async getArtistById (id: string): Promise<any> {
        return await this.artistModel.find({_id: id});
    }

    /**
     * Add a new Artist record. 
     * @param {IArtist} artist
     * @returns Promise<string> id of the record created
     */
    async addArtist(artist: IArtist): Promise<string> {
        const { name, url, year } = artist;
        try {
            const newRecord = new this.artistModel({
                name,
                url,
                year
            });
            const result = await newRecord.save();
            return result.id;
        } catch (err) {
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
     * @param {IArtist} artist
     * @returns Promise<string> id of the record updated
     */
    async updateArtistById (id: string, artist: IArtist): Promise<string> {
        const { name, url, year} = artist;
        const record = await this.artistModel.findOneAndUpdate({_id: id}, {
            name, url, year
        }, { new: true });
        return record.id;
    }

    /**
     * Delete existing record by id
     * @param id 
     * @returns Promise<any>
     */
    async deleteArtistById (id: string): Promise<any> {
        try {
            return await this.artistModel.deleteOne({_id: id});
        } catch (err) {
            throw new BadRequestException(`Invalid Artist ID`);
        }
        
    }
}
