import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { apiDocumentation } from './swagger/api.swagger';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.use('/', express.static(path.join(__dirname, '/build')));
  //Swagger support as a function
  apiDocumentation(app);
  const server = await app.listen(PORT);
  console.log(`Server listening on PORT - ${server.address().port}`);

}

bootstrap();
