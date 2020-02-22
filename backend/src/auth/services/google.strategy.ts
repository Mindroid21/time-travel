import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-google-oauth20';
// Custom Components
import { jwtSecret } from './../config/jwt.config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { IUser } from '../models/user.model';
import { ConfigService, OAUTH } from './../../config/google.config.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    private logger: Logger;
    constructor (
        @InjectModel('User') private readonly userModel: Model<IUser>,
        configService: ConfigService,
    ) {
        super ({
        clientID: configService.getValue(OAUTH.CLIENT_ID),
        clientSecret: configService.getValue(OAUTH.CLIENT_SECRET),
        callbackURL: `${configService.getValue(OAUTH.BASE_URL)}/auth/google/callback`,
        passReqToCallback: true,
        scope: ['email', 'profile'],
        // NOT WORKING
        approval_prompt: 'force',
        access_type: 'offline',
      });
      this.logger = new Logger('GoogleStrategy');
    }

 async validate (request: any, accessToken: string, refreshToken: string, profile: any, done: (err: any, result: any) => void): Promise<any> {
    this.logger.debug (`Showing request: ${JSON.stringify(request)}`);
    this.logger.debug (`Showing accessToken: ${JSON.stringify(accessToken)}`);
    this.logger.debug (`Showing profile: ${JSON.stringify(profile)}`);
    // const { username } = payload;
    // const user = await this.userModel.findOne({ username });
    // if (!user) {
    //     throw new UnauthorizedException();
    // }
    // return user;
 }

 // WORKAROUND: pass options to superclass auth call by overriding superclass method
 authorizationParams(options: any): any {
    return Object.assign(options, {
      approval_prompt: 'force',
      access_type: 'offline',
    });
  }
}
