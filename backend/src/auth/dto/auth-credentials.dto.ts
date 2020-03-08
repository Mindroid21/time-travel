import { IsString, MinLength, MaxLength, Matches, IsOptional } from "class-validator";

export class AuthCredentialsDto {
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    firstName: string;

    @IsString()
    @MinLength(2)
    @MaxLength(20)
    lastName: string;

    @IsString()
    @MinLength(4)
    @Matches(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
    {message: `Username should contain valid email address`})
    username: string;

    @IsString()
    @MinLength(4)
    @MaxLength(10)    
    password: string;
}

export class LoginCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(40)
    @Matches(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
    {message: `Username should contain valid email address`})
    username: string;

    @IsString()
    @MinLength(4)
    @MaxLength(10)    
    password: string;
}