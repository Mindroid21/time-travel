import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
// custom
import { TimerController } from './controllers/timer.controller';
import { TimerService } from './services/timer.service';
import { jwtSecret } from '../auth/config/jwt.config';
import { TimerSchema } from './models/timer.model';
import { AuthModule } from '../auth/auth.module';
import { TagsModule } from '../tags/tags.module';
import { GroupsModule } from '../groups/groups.module';
import { ArtistsModule } from '../artists/artists.module';

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
        MongooseModule.forFeature([{
            name: 'Timer',
            schema: TimerSchema
        }]),
        ArtistsModule,
        AuthModule,
        TagsModule,
        GroupsModule,
    ],
    controllers: [TimerController],
    providers: [TimerService],
    exports: [TimerService]
})
export class TimerModule {}
