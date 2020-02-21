import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
// custom
import { GroupsController } from './controllers/groups.controller';
import { GroupsService } from './services/groups.service';
import { GroupSchema } from './models/groups.model';
import { jwtSecret } from '../auth/config/jwt.config';

@Module({
  imports: [
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
            name: 'Group',
            schema: GroupSchema
        }
    ])
  ],
  providers: [
    GroupsService
  ],
  controllers: [
    GroupsController
  ],
  exports: [
    GroupsService
  ]
})
export class GroupsModule {}
