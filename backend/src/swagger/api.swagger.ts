import { INestApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AuthModule } from "../auth/auth.module";

export function apiDocumentation(app: INestApplication): void {

    const authAPI = new DocumentBuilder()
    .setTitle('Authentication and Register flow of Time Travel app')
    .setDescription('The Auth Module contains API requests for authentication & registration flow')
    .setVersion('1.0')
    .addTag('Auth')
    .build();

    const document01 = SwaggerModule.createDocument(app, authAPI, {include: [AuthModule], });
    SwaggerModule.setup('swagger/api/auth', app, document01);

};