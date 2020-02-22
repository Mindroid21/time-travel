/**
 * PAJ - Google OAuth configuration for the project
 */
import { Injectable, UnauthorizedException, ConflictException, InternalServerErrorException, Logger, BadRequestException } from '@nestjs/common';
import * as config from 'config';


export enum OAUTH {
    CLIENT_ID = 'clientID',
    CLIENT_SECRET = 'clientSecret',
    BASE_URL = 'baseURL'
};


@Injectable()
export class ConfigService {
    private logger: Logger;
    private clientID: string;
    private clientSecret: string;
    private baseURL: string;

    constructor () {
        this.logger = new Logger('ConfigService');
        this.clientID = process.env.gClient ? process.env.gClient['id'] : config.get('gClient').id;
        this.clientSecret = process.env.gClient ? process.env.gClient['secret'] : config.get('gClient').secret;
        this.baseURL = process.env.gClient ? process.env.gClient['baseURL'] : config.get('gClient').baseURL;
    }

    getValue (type: OAUTH) {
        switch (type) {
            case OAUTH.CLIENT_ID:
                return this.clientID;
            case OAUTH.CLIENT_SECRET:
                return this.clientSecret;
            case OAUTH.BASE_URL:
                return this.baseURL;
        }
    }
}