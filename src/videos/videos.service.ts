import { Injectable, NotFoundException } from '@nestjs/common';
import { Video } from './interfaces/video.interface';
import { VIDEOS } from '../data/videos';
import { from, Observable, of, throwError } from 'rxjs';
import { find, findIndex, flatMap, map, tap } from 'rxjs/operators';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';

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
   * @returns {Observable<Video[] | void>}
   */
  findAll(): Observable<Video[] | void> {
    return of(this._videos)
      .pipe(
        map(_ => (!!_ && !!_.length) ? _ : undefined),
      );
  }

  /**
   * Returns the video of the list matching the id
   *
   * @param {string} id of the video
   *
   * @returns {Observable<Video>}
   */
  findOne(id: string): Observable<Video> {
    return from(this._videos)
      .pipe(
        find(_ => _.id === id),
        flatMap(_ =>
          !!_ ?
            of(_) :
            throwError(new NotFoundException(`Video with id '${id}' not found`)),
        ),
      );
  }

  /**
   * Adds the video in videos list
   *
   * @param {CreateVideoDto} data of the video to create
   *
   * @returns {Observable<Video>}
   */
  create(video: CreateVideoDto): Observable<Video> {
    return of(video)
      .pipe(
        map(_ =>
          Object.assign(_,{
            id: this._createId(),
          }) as Video,
        ),
        tap(_ => this._videos = this._videos.concat(_)),
      );
  }

  /**
   * Update a video in the videos list
   *
   * @param {UpdateVideoDto}
   * @param {string}
   *
   * @returns {Observable<Video>}
   */
  update(video: UpdateVideoDto, id: string): Observable<Video> {
    return this._findVideosIndexOfList(id)
      .pipe(
        tap(_ => Object.assign(this._videos[_], video)),
        map(_ => this._videos[_]),
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
