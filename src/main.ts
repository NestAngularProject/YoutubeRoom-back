import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as Config from 'config';
import { AppConfig } from './interfaces/app-config.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfig } from './interfaces/swagger-config.interface';
import { UsersModule } from './users/users.module';
import { VideosModule } from './videos/videos.module';
import { RoomsModule } from './rooms/rooms.module';

async function bootstrap(config: AppConfig, swaggerConfig: SwaggerConfig) {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({logger: true}));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      }),
      );
  // create swagger options
  const options = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .setVersion(swaggerConfig.version)
    .addTag(swaggerConfig.tag1)
    .addTag(swaggerConfig.tag2)
    .addTag(swaggerConfig.tag3)
    .build()

  // create swagger document
  const youtubeRoomDocument = SwaggerModule.createDocument(app, options, {
    include: [UsersModule, VideosModule, RoomsModule],
  })

  // setup swagger module
  SwaggerModule.setup(swaggerConfig.path, app, youtubeRoomDocument);

  // launch server
  await app.listen(3000);
  app.enableCors();
  Logger.log(' Application served at http://${config.host}:${config.port}', 'bootstrap');
}
bootstrap(Config.get<AppConfig>('server'), Config.get<SwaggerConfig>('swagger'));
