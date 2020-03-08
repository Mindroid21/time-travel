import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
// custom
import { TagsController } from './controllers/tags.controller';
import { TagsService } from './services/tags.service';
import { jwtSecret } from '../auth/config/jwt.config';
import { TagSchema } from './models/tags.model';

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
            name: 'Tag',
            schema: TagSchema
        }
    ])
  ],
  controllers: [TagsController],
  providers: [TagsService],
  exports: [TagsService]
})
export class TagsModule {}
