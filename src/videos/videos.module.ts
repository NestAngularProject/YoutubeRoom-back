import { Module } from '@nestjs/common';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoSchema } from './schemas/video.schema';
import { VideosDao } from './dao/videos.dao';

@Module({
  imports: [ MongooseModule.forFeature([{name: 'Video', schema: VideoSchema}])],
  controllers: [VideosController],
  providers: [VideosService, VideosDao],
})
export class VideosModule {}
