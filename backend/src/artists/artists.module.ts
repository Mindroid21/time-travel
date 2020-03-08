import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
// Custom components
import { ArtistController } from './controllers/artists.controller';
import { ArtistsService } from './services/artists.service';
import { ArtistSchema } from './models/artists.model';
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
                name: 'Artist',
                schema: ArtistSchema
            }
        ])
    ],
    controllers: [
        ArtistController
    ],
    providers: [
        ArtistsService
    ],
    exports: [
        ArtistsService
    ]
})
export class ArtistsModule {}
