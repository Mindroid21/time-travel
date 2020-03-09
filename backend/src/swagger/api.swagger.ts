import { INestApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { GroupsModule } from "../groups/groups.module";
import { ArtistsModule } from "../artists/artists.module";
import { AuthModule } from "../auth/auth.module";
import { TagsModule } from "../tags/tags.module";
import { TimerModule } from "../timers/timer.module";

export function apiDocumentation(app: INestApplication): void {
    const APP_NAME = `Timer Travel`;
    const VERSION = `1.0`;

    const authAPI = new DocumentBuilder()
    .setTitle(`Authentication and Register flow of ${APP_NAME}`)
    .setDescription(`The Auth Module contains API requests for authentication & registration flow in ${APP_NAME}`)
    .setVersion(VERSION)
    .addTag(`Auth`)
    .build();

    const timerAPI = new DocumentBuilder()
    .setTitle(`CRUD Operations on Timer Records in ${APP_NAME}`)
    .setDescription(`Timer Module contains API handlers for all Timer records currently being edited / updated by the user`)
    .setVersion(VERSION)
    .addTag(`Timer`)
    .build();

    const groupAPI = new DocumentBuilder()
    .setTitle(`CRUD Operations on Group in Soul Lyrics`)
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

    

    const tagAPI = new DocumentBuilder()
    .setTitle('CRUD Operations on Tags in Soul Lyrics')
    .setDescription('Tags Module contains API to CRUD Tags under Soul Lyrics')
    .setVersion('2.0')
    .addTag('Tags')
    .build();

    const document01 = SwaggerModule.createDocument(app, authAPI, {include: [AuthModule], });
    const document02 = SwaggerModule.createDocument(app, timerAPI, {include: [TimerModule], });
    const document03 = SwaggerModule.createDocument(app, groupAPI, {include: [GroupsModule], });
    const document04 = SwaggerModule.createDocument(app, tagAPI, {include: [TagsModule], });
    const document05 = SwaggerModule.createDocument(app, artistAPI, {include: [ArtistsModule], });

    SwaggerModule.setup('swagger/api/auth', app, document01);
    SwaggerModule.setup('swagger/api/timers', app, document02);
    SwaggerModule.setup('swagger/api/artists', app, document02);
    SwaggerModule.setup('swagger/api/tags', app, document04);
    SwaggerModule.setup('swagger/api/drafts', app, document05);

};