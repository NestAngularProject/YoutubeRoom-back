import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { VideosModule } from './videos/videos.module';

@Module({
  imports: [UsersModule, VideosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
