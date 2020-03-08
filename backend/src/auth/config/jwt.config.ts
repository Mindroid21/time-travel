import { JwtSecret } from './../interfaces/jwt-payload.interface';
import * as config from 'config';

const secretKey = process.env.secret ? process.env.secret: config.get('jwt').secret;
const jwtExpiry = process.env.expiry ? process.env.expiry: config.get('jwt').expiry;

export const jwtSecret: JwtSecret = {
    secretOrKey: secretKey,
    expiry: jwtExpiry,
};