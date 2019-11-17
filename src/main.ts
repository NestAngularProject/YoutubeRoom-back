import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as Config from 'config';
import { AppConfig } from './app-config.interface';

async function bootstrap(config: AppConfig) {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({logger: true}));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      }),
      );
  await app.listen(3000);
  Logger.log(' Application served at http://${config.host}:${config.port}', 'bootstrap');
}
bootstrap(Config.get<AppConfig>('server'));
