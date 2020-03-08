import { Controller, Post, Body, UseGuards, ValidationPipe, UnauthorizedException, Req, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation } from '@nestjs/swagger';
// Custom Components
import { AuthCredentialsDto, LoginCredentialsDto } from '../dto/auth-credentials.dto';
import { AuthService } from '../services/auth.service';
import { GetUser } from '../decorators/auth.decorators';
import { IDisplayUser } from '../models/user.model';

@Controller('auth')
export class AuthController {

    private logger: Logger;

    constructor(
        private authService: AuthService        
    ) {
        this.logger = new Logger('AuthController');
    }
    
    @Post('/activateUser')
    @ApiOperation({ title: 'Activate User to Premium via Session Token. *Requires Session Token' })
    @UseGuards(AuthGuard())
    activateUser(@GetUser() user: IDisplayUser): Promise<any> {
        return this.authService.activateUser(user);
    }

    @Post('/signup')
    @ApiOperation({ title: 'API to register user.' })
    async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<any> {                
        return await this.authService.signUp(authCredentialsDto);        
    }

    @Post('/login')
    @ApiOperation({ title: 'API to Login User with email & password.' })
    async login(
        @Body(ValidationPipe) authCredentialsDto: LoginCredentialsDto,
    ): Promise<{accessToken: string}> {
        const username = await this.authService.login(authCredentialsDto);
        if (!username) {
            throw new UnauthorizedException('Invalid Credentials');
        } else {
            return username;
        }
    }

    @Post('/details')
    @ApiOperation({ title: 'API to get User Details. *Requires Session Token' })
    @UseGuards(AuthGuard())
    test(@GetUser() user: IDisplayUser): IDisplayUser {        
        return user;
    }
}
