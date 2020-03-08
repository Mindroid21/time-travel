import { Injectable, UnauthorizedException, ConflictException, InternalServerErrorException, Logger, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// Custom Components
import { AuthCredentialsDto, LoginCredentialsDto } from '../dto/auth-credentials.dto';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import * as bcrypt from 'bcrypt';
// Custom Components
import { IUser, IDisplayUser } from '../models/user.model';
import { USER_ROLES, USER_STATUS } from '../constants/';

@Injectable()
export class AuthService {
    private logger = new Logger('AuthService');

    constructor(
        @InjectModel('User') private readonly userModel: Model<IUser>,
        private jwtService: JwtService,
    ) { }

    async signUp (authCredentialsDto: AuthCredentialsDto): Promise<any> {
        const { username, password, firstName, lastName } = authCredentialsDto;
        const promise = new Promise < any > (async (resolve: (message: string) => void, reject: (error: any) => void): Promise < any > => {
            const isUnique = await this.checkIfUniqueUsername(authCredentialsDto);
            if (!isUnique) {
                this.logger.verbose(`Username already exists - ${authCredentialsDto.username}`);
                reject(new BadRequestException(`Username already exists. Try logging in / forgot password`));
            } else {
                const salt = await bcrypt.genSalt();
                const user  = new this.userModel({
                    firstName,
                    lastName,
                    username,
                    salt,
                    role: USER_ROLES.FREE,
                    status: USER_STATUS.INACTIVE,
                    password: await this.hashPassword(password, salt)
                });
                try {
                    await user.save();
                    resolve(`User created!`);
                } catch (error) {
                    this.logger.verbose(`Error while signing up: ${JSON.stringify(error)}`);
                    reject(new InternalServerErrorException(error));
                }
            }
        });
        return promise;        
    }

    async activateUser (userDetails: IDisplayUser): Promise<any> {
        const status = USER_STATUS.ACTIVE;
        const role = USER_ROLES.PREMIUM;    
        const { username } = userDetails;
        const record = await this.userModel.findOneAndUpdate({username}, {status, role}, {
            new: true
        });
        return record;
    }

    async generateToken (username: string): Promise<string> {
        const payload: JwtPayload = { username };
        return this.jwtService.sign(payload);
    }
    
    async login (authCredentialsDto: LoginCredentialsDto): Promise<{accessToken: string}> {
        const username = await this.validateUserPassword(authCredentialsDto);
        if (!username) {
            throw new UnauthorizedException('Invalid Credentials');
        }
        const payload: JwtPayload = { username };
        const accessToken = await this.jwtService.sign(payload);
        return { accessToken };
    }

    /**
     * Retrieve user details by ID
     * ONLY to be used internally, not mapped to APIs
     * @param id 
     */
    async getUserById(id: string): Promise<IDisplayUser> {
        const user = await this.userModel.findOne({_id: id});
        return {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            role: user.role,            
        };
    }



    async checkIfUniqueUsername (authCredentialsDto: AuthCredentialsDto): Promise<boolean> {
        const { username } = authCredentialsDto;
        const user = await this.userModel.findOne({username});
        if (user) return false;
        else return true;
    }

    async validateUserPassword (authCredentialsDto: LoginCredentialsDto): Promise<string> {
        const { username, password } = authCredentialsDto;
        const user = await this.userModel.findOne({username});
        if (user && await this.isValidPassword(password, user.salt, user.password)) {
            return user.username;
        } else {
            return null;
        }
    }

    private async hashPassword (password: string, salt: string): Promise <string> {
        return bcrypt.hash(password, salt);
    }

    async isValidPassword (password: string, salt: string, userPassword: string): Promise <boolean> {
        const hash = await bcrypt.hash(password, salt);
        return hash === userPassword;
    }
}
