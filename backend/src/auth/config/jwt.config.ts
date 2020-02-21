import { JwtSecret } from './../interfaces/jwt-payload.interface';

export const jwtSecret: JwtSecret = {
    secretOrKey: 'topSecret51',
    expiry: 3600,
};