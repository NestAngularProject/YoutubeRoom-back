import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VideosService } from './videos.service';
import { Video } from './interfaces/video.interface';
import { Observable } from 'rxjs';
import { CreateVideoDto } from './dto/create-video.dto';

@Controller('videos')
export class VideosController {
  constructor(private readonly _videosService: VideosService) {}

  /**
   * Handler to answer to /videos route
   *
   * @returns {Observable<Video[] | void>}
   */
  @Get()
  findAll(): Observable<Video[] | void> {
    return this._videosService.findAll();
  }

  /**
   * Handler to answer to /videos/id
   *
   * @param {string} id of the video
   *
   * @returns {Observable<Video>}
   */
  @Get(':id')
  findOne(@Param('id') id: string): Observable<Video> {
    return this._videosService.findOne(id);
  }

  @Post()
  create(@Body() createVideoDto: CreateVideoDto){
    return this._videosService.create(createVideoDto);
  }
}
