import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
// Custom Components
import { jwtSecret } from './../config/jwt.config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { IUser } from '../models/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
 constructor(
    @InjectModel('User') private readonly userModel: Model<IUser>,
 ) {
     super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         secretOrKey: jwtSecret.secretOrKey,
     });
 }

 async validate(payload: JwtPayload): Promise<any> {
    const { username } = payload;
    const user = await this.userModel.findOne({ username });
    if (!user) {
        throw new UnauthorizedException();
    }
    return user;
 }
}
