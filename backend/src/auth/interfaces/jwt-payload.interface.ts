export interface JwtPayload {
    username: string;
}

export interface JwtSecret {
    secretOrKey: string;
    expiry? : number;
}