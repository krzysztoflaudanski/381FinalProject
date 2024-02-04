import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import * as express from 'express';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.use('/', express.static('public/'));
  await app.enableShutdownHooks();
  const configService = app.get(ConfigService);
  await app.listen(configService.get('port'));
}
bootstrap();

// app.enableCors({
//   origin: 'http://localhost:3000', // Zmień to zgodnie z rzeczywistym adresem swojego klienta
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
//   optionsSuccessStatus: 204,
//   allowedHeaders: 'Content-Type,Authorization',
// });
