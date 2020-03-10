import { INestApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AuthModule } from "../auth/auth.module";
import { QuoteModule } from "../quotes/quotes.module";
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

    const quoteAPI = new DocumentBuilder()
    .setTitle(`CRUD Operations on Quotations in ${APP_NAME}`)
    .setDescription(`Quote Module contains API to CRUD Quotations under ${APP_NAME}`)
    .setVersion(VERSION)
    .addTag('Quotes, Quotations')
    .build();

    const document01 = SwaggerModule.createDocument(app, authAPI, {include: [AuthModule], });
    const document02 = SwaggerModule.createDocument(app, timerAPI, {include: [TimerModule], });
    const document03 = SwaggerModule.createDocument(app, quoteAPI, {include: [QuoteModule], });


    SwaggerModule.setup('swagger/api/auth', app, document01);
    SwaggerModule.setup('swagger/api/timer', app, document02);
    SwaggerModule.setup('swagger/api/quotes', app, document03);


};