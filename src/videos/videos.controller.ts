import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { VideosService } from './videos.service';
import { Video } from './interfaces/video.interface';
import { Observable } from 'rxjs';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { VideoEntity } from './entities/video.entity';

@Controller('videos')
@UseInterceptors(ClassSerializerInterceptor)
export class VideosController {
  constructor(private readonly _videosService: VideosService) {}

  /**
   * Handler to answer to /videos route
   *
   * @returns {Observable<VideoEntity[] | void>}
   */
  @Get()
  findAll(): Observable<VideoEntity[] | void> {
    return this._videosService.findAll();
  }

  /**
   * Handler to answer to /videos/id route
   *
   * @param {string} id of the video
   *
   * @returns {Observable<VideoEntity>}
   */
  @Get(':id')
  findOne(@Param('id') id: string): Observable<VideoEntity> {
    return this._videosService.findOne(id);
  }

  /**
   * Handler to answer to /videos route
   *
   * @param {CreateVideoDto} data of the video to create
   *
   * @returns {Observable<VideoEntity>}
   */
  @Post()
  create(@Body() createVideoDto: CreateVideoDto): Observable<VideoEntity> {
    return this._videosService.create(createVideoDto);
  }

  /**
   * Handler to answer to /videos/id route
   * @param {UpdateVideoDto} data of the video to update
   * @param {Observable<VideoEntity>}
   */
  @Put(':id')
  update(@Body() updateVideoDto: UpdateVideoDto, @Param('id') id: string): Observable<VideoEntity> {
    return this._videosService.update(updateVideoDto, id);
  }

  /**
   * Handler to answer to /videos/id route
   *
   * @param {string}
   *
   * @returns {Observable<void>}
   */
  @Delete(':id')
  delete(@Param('id') id: string): Observable<void> {
    return this._videosService.delete(id);
  }
}
