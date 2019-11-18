import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { VideosService } from './videos.service';
import { Observable } from 'rxjs';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { VideoEntity } from './entities/video.entity';
import {
  ApiBadRequestResponse, ApiCreatedResponse, ApiImplicitBody,
  ApiImplicitParam,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse, ApiUseTags,
} from '@nestjs/swagger';

@ApiUseTags('videos')
@Controller('videos')
@UseInterceptors(ClassSerializerInterceptor)
export class VideosController {

  /**
   *
   * @param _videosService
   */
  constructor(private readonly _videosService: VideosService) {}

  /**
   * Handler to answer to GET /videos route
   *
   * @returns {Observable<VideoEntity[] | void>}
   */
  @ApiOkResponse({description: 'Returns an array of video', type: VideoEntity, isArray: true})
  @ApiNoContentResponse({description: 'No video exists in database'})
  @Get()
  findAll(): Observable<VideoEntity[] | void> {
    return this._videosService.findAll();
  }

  /**
   * Handler to answer to GET /videos/id route
   *
   * @param {string} id of the video
   *
   * @returns {Observable<VideoEntity>}
   */
  @ApiOkResponse({description: 'Returns one video for the given id', type: VideoEntity})
  @ApiNotFoundResponse({description: 'Video with the given id doesn\'t exist in the database'})
  @ApiBadRequestResponse({description: 'Parameter provided is not good'})
  @ApiImplicitParam({name: 'id', description: 'Unique identifier of the video in the database', type: String})
  @Get(':id')
  findOne(@Param('id') id: string): Observable<VideoEntity> {
    return this._videosService.findOne(id);
  }

  /**
   * Handler to answer to POST /videos route
   *
   * @param {CreateVideoDto} data of the video to create
   *
   * @returns {Observable<VideoEntity>}
   */
  @ApiCreatedResponse({ description: 'The video has been successfully created', type: VideoEntity })
  @ApiBadRequestResponse({ description: 'Payload provided is not good' })
  @ApiImplicitBody({ name: 'CreateVideoDto', description: 'Payload to create a new video', type: CreateVideoDto })
  @Post()
  create(@Body() createVideoDto: CreateVideoDto): Observable<VideoEntity> {
    return this._videosService.create(createVideoDto);
  }

  /**
   * Handler to answer to PUT /videos/id route
   *
   * @param {UpdateVideoDto} data of the video to update
   * @param {string} id of the video to update
   *
   * @returns {Observable<VideoEntity>}
   */
  @ApiOkResponse({ description: 'The video has been successfully updated', type: VideoEntity })
  @ApiNotFoundResponse({ description: 'Video with the given id doesn\'t exist in the database' })
  @ApiBadRequestResponse({ description: 'Parameter and/or payload provided are not good' })
  @ApiImplicitBody({ name: 'UpdateVideoDto', description: 'Payload to update a video', type: UpdateVideoDto })
  @ApiImplicitParam({ name: 'id', description: 'Unique identifier of the video in the database', type: String })
  @Put(':id')
  update(@Body() updateVideoDto: UpdateVideoDto, @Param('id') id: string): Observable<VideoEntity> {
    return this._videosService.update(updateVideoDto, id);
  }

  /**
   * Handler to answer to DELETE /videos/id route
   *
   * @param {string} id of the video to delete
   *
   * @returns {Observable<void>}
   */
  @ApiNoContentResponse({ description: 'The video has been successfully deleted' })
  @ApiNotFoundResponse({ description: 'Video with the given id doesn\'t exist in the database' })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiImplicitParam({ name: 'id', description: 'Unique identifier of the video in the database', type: String })
  @Delete(':id')
  delete(@Param('id') id: string): Observable<void> {
    return this._videosService.delete(id);
  }
}
