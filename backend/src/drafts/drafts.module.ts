import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
// custom
import { DraftController } from './controllers/drafts.controller';
import { DraftService } from './services/drafts.service';
import { jwtSecret } from '../auth/config/jwt.config';
import { DraftSchema } from './models/drafts.model';
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
            name: 'Draft',
            schema: DraftSchema
        }]),
        ArtistsModule,
        AuthModule,
        TagsModule,
        GroupsModule,
    ],
    controllers: [DraftController],
    providers: [DraftService],
    exports: [DraftService]
})
export class DraftModule {}
