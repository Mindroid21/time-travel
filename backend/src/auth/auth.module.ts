import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
// Custom components
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { jwtSecret } from './config/jwt.config';
import { JwtStrategy } from './services/jwt.strategy';
import { UserSchema } from './models/user.model';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    EmailModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: jwtSecret.secretOrKey,
      signOptions: {
        expiresIn: jwtSecret.expiry,
      },
    }),
    MongooseModule.forFeature([
      {
          name: 'User',
          schema: UserSchema,
      },
    ])
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
  ],
  exports: [
    JwtStrategy,
    PassportModule,
    AuthService
  ],
})
export class AuthModule {}
