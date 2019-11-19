import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Observable, of, throwError } from 'rxjs';
import { catchError, flatMap, map} from 'rxjs/operators';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { VideoEntity } from './entities/video.entity';
import { VideosDao } from './dao/videos.dao';

@Injectable()
export class VideosService {
  /**
   * Class constructor
   */
  constructor(private readonly _videosDao: VideosDao) {
  }

  /**
   * Returns the list of videos
   *
   * @returns {Observable<VideoEntity[] | void>}
   */
  findAll(): Observable<VideoEntity[] | void> {
    return this._videosDao.find()
      .pipe(
        map(_ => (!!_ && !!_.length) ? _.map(__ => new VideoEntity(__)) : undefined),
      );
  }

  /**
   * Returns the video of the list matching the id
   *
   * @param {string} id of the video
   *
   * @returns {Observable<VideoEntity>}
   */
  findOne(id: string): Observable<VideoEntity> {
    return this._videosDao.findById(id)
      .pipe(
        catchError(e => throwError(new UnprocessableEntityException(e.message))),
        flatMap(_ =>
          !!_ ?
            of(new VideoEntity(_)) :
            throwError(new NotFoundException(`Video with id '${id}' not found`)),
        ),
      );
  }

  /**
   * Adds the video in videos list
   *
   * @param {CreateVideoDto} data of the video to create
   *
   * @returns {Observable<VideoEntity>}
   */
  create(video: CreateVideoDto): Observable<VideoEntity> {
    return this._addVideo(video)
      .pipe(
        catchError(e => throwError(new UnprocessableEntityException(e.message))),
        flatMap(_ => this._videosDao.create(_)),
        map(_ => new VideoEntity(_)),
      );
  }

  /**
   * Update a video in the videos list
   *
   * @param {string} id of the video to update
   * @param {UpdateVideoDto} data of the video to update
   *
   * @returns {Observable<VideoEntity>}
   */
  update(id: string, video: UpdateVideoDto): Observable<VideoEntity> {
    return this._videosDao.findByIdAndUpdate(id, video)
      .pipe(
        catchError(e => throwError(new UnprocessableEntityException(e.message))),
        flatMap(_ =>
          !!_ ?
            of(new VideoEntity((_))) :
            throwError(new NotFoundException(`Video with id '${id}' not found`)),
        ),
      );
  }

  /**
   * Delete a video from the videos list
   *
   * @param {string} id of the video to delete
   *
   * @returns {Observable<void>}
   */
  delete(id: string): Observable<void> {
    return this._videosDao.findByIdAndDelete(id)
      .pipe(
        catchError(e => throwError(new NotFoundException(e.message))),
        flatMap(_ =>
          !!_ ?
            of(undefined) :
            throwError(new NotFoundException(`Video with id '${id}' not found`)),
        ),
      );
  }

  /**
   * Add a valid video in videos list
   *
   * @param {CreateVideoDto} video to add
   *
   * @returns {Observable<CreateVideoDto>}
   *
   * @private
   */
  private _addVideo(video: CreateVideoDto): Observable<CreateVideoDto> {
    return of(video)
      .pipe(
        map(_ =>
          Object.assign(_, {
            timestamp: 0,
            seen: false,
          }),
        ),
      );
  }
}
