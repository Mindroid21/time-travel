import { INestApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { GroupsModule } from "../groups/groups.module";
import { ArtistsModule } from "../artists/artists.module";
import { AuthModule } from "../auth/auth.module";
import { TagsModule } from "../tags/tags.module";
import { DraftModule } from "../drafts/drafts.module";
import { SongModule } from "../songs/songs.module";
import { PlaylistModule } from "../playlists/playlists.module";

export function apiDocumentation(app: INestApplication): void {

    const playlistAPI = new DocumentBuilder()
    .setTitle('*New - CRUD Operations on Playlist Model in Soul Lyrics')
    .setDescription('Playlist Module contains API handlers for all records of Playlists currently being edited / updated by the user')
    .setVersion('2.1')
    .addTag('Playlist')
    .build();

    const songAPI = new DocumentBuilder()
    .setTitle('CRUD Operations on Song Model in Soul Lyrics')
    .setDescription('Song Module contains API handlers for all records of Songs currently being edited / updated by the user')
    .setVersion('2.0')
    .addTag('Songs')
    .build();

    const draftAPI = new DocumentBuilder()
    .setTitle('CRUD Operations on Songs saved as Drafts in Soul Lyrics')
    .setDescription('Draft Module contains API handlers for all records of Songs currently being edited / updated by the user')
    .setVersion('2.0')
    .addTag('Drafts')
    .build();

    const groupAPI = new DocumentBuilder()
    .setTitle('CRUD Operations on Group in Soul Lyrics')
    .setDescription('Groups Module contains API to CRUD Groups / Categories under Soul Lyrics')
    .setVersion('2.0')
    .addTag('Groups')
    .build();

    const artistAPI = new DocumentBuilder()
    .setTitle('CRUD Operatoins on Artist in Soul Lyrics')
    .setDescription('Atists Module contains API to CRUD Artist / Singers defined in Soul Lyrics')
    .setVersion('2.0')
    .addTag('Artists')
    .build();

    const authAPI = new DocumentBuilder()
    .setTitle('Authentication and Register flow of Soul Lyrics')
    .setDescription('The Auth Module contains API requests for authentication & registration flow in Soul Lyrics')
    .setVersion('2.0')
    .addTag('Auth')
    .build();

    const tagAPI = new DocumentBuilder()
    .setTitle('CRUD Operations on Tags in Soul Lyrics')
    .setDescription('Tags Module contains API to CRUD Tags under Soul Lyrics')
    .setVersion('2.0')
    .addTag('Tags')
    .build();

    const document01 = SwaggerModule.createDocument(app, groupAPI, {include: [GroupsModule], });
    const document02 = SwaggerModule.createDocument(app, artistAPI, {include: [ArtistsModule], });
    const document03 = SwaggerModule.createDocument(app, authAPI, {include: [AuthModule], });
    const document04 = SwaggerModule.createDocument(app, tagAPI, {include: [TagsModule], });
    const document05 = SwaggerModule.createDocument(app, draftAPI, {include: [DraftModule], });
    const document06 = SwaggerModule.createDocument(app, songAPI, {include: [SongModule], });
    const document07 = SwaggerModule.createDocument(app, playlistAPI, {include: [PlaylistModule], });

    SwaggerModule.setup('swagger/api/groups', app, document01);
    SwaggerModule.setup('swagger/api/artists', app, document02);
    SwaggerModule.setup('swagger/api/auth', app, document03);
    SwaggerModule.setup('swagger/api/tags', app, document04);
    SwaggerModule.setup('swagger/api/drafts', app, document05);
    SwaggerModule.setup('swagger/api/songs', app, document06);
    SwaggerModule.setup('swagger/api/playlists', app, document07);

};