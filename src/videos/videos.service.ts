import { Injectable, NotFoundException } from '@nestjs/common';
import { Video } from './interfaces/video.interface';
import { VIDEOS } from '../data/videos';
import { from, Observable, of, throwError } from 'rxjs';
import { find, findIndex, flatMap, map, tap } from 'rxjs/operators';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { VideoEntity } from './entities/video.entity';

@Injectable()
export class VideosService {
  // private to stock a list of videos
  private _videos: Video[];

  /**
   * Class constructor
   */
  constructor() {
    this._videos = VIDEOS;
  }

  /**
   * Returns the list of videos
   *
   * @returns {Observable<VideoEntity[] | void>}
   */
  findAll(): Observable<VideoEntity[] | void> {
    return of(this._videos)
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
    return from(this._videos)
      .pipe(
        find(_ => _.id === id),
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
    return of(video)
      .pipe(
        map(_ =>
          Object.assign(_,{
            id: this._createId(),
          }) as Video,
        ),
        tap(_ => this._videos = this._videos.concat(_)),
        map(_ => new VideoEntity(_)),
      );
  }

  /**
   * Update a video in the videos list
   *
   * @param {UpdateVideoDto}
   * @param {string}
   *
   * @returns {Observable<VideoEntity>}
   */
  update(video: UpdateVideoDto, id: string): Observable<VideoEntity> {
    return this._findVideosIndexOfList(id)
      .pipe(
        tap(_ => Object.assign(this._videos[_], video)),
        map(_ => new VideoEntity(this._videos[_])),
      );
  }

  /**
   * Delete a video from the videos list
   *
   * @param {string}
   *
   * @returns {Observable<void>}
   */
  delete(id: string): Observable<void> {
    return this._findVideosIndexOfList(id)
      .pipe(
        tap(_ => this._videos.splice(_, 1)),
        map(() => undefined),
      );
  }

  /**
   * Returns the index of the video in the videos list
   *
   * @param {string}
   *
   * @returns {Observable<Number>}
   *
   * @private
   */
  private _findVideosIndexOfList(id: string): Observable<number> {
    return from(this._videos)
      .pipe(
        findIndex(_ => _.id === id),
        flatMap(_ => _ > -1 ?
          of(_) :
          throwError(new NotFoundException(`Video with id '${id}' not found`)),
        ),
      );
  }

  /**
   * Creates a new id
   *
   * @returns {string}
   *
   * @private
   */
  private _createId(): string {
    const crypto = require('crypto');
    return crypto.randomBytes(16).toString('hex');
  }
}
