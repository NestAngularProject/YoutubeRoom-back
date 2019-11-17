import { Injectable, NotFoundException } from '@nestjs/common';
import { Video } from './interfaces/video.interface';
import { VIDEOS } from '../data/videos';
import { from, Observable, of, throwError } from 'rxjs';
import { find, flatMap, map, tap } from 'rxjs/operators';
import { CreateVideoDto } from './dto/create-video.dto';

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
            throwError(new NotFoundException(`Video with id '${id} not found`)),
        ),
      );
  }

  create(video: CreateVideoDto): Observable<Video> {
    return this._addVideo(video);
  }

  private _addVideo(video: CreateVideoDto): Observable<Video> {
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
   * Creates a new id
   *
   * @returns {string}
   *
   * @private
   */
  private _createId(): string {
    return `${new Date().getTime()}`;
  }


}
