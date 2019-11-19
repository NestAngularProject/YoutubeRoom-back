import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, MongooseDocument } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Video } from '../interfaces/video.interface';
import { CreateVideoDto } from '../dto/create-video.dto';
import { UpdateVideoDto } from '../dto/update-video.dto';

@Injectable()
export class VideosDao {
  /**
   * Class constructor
   *
   * @param _userModel
   */
  constructor(@InjectModel('Video') private readonly _videoModel: Model<Video>) {
  }

  /**
   * Call mongoose method, call toJSON on each result and returns User[] or undefined
   *
   * @return {Observable<Video[] | void>}
   */
  find(): Observable<Video[] | void> {
    return from(this._videoModel.find({}))
      .pipe(
        map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined),
      );
  }

  /**
   * Returns all videos from the room in parameter
   *
   * @param {string} name of the room in the database
   *
   * @return {Observable<Video[] | void>}
   */
  findMany(roomName: string): Observable<Video[] | void> {
    return from(this._videoModel.find({room: roomName}))
      .pipe(
        map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined),
      );
  }

  /**
   * Returns one video of the list matching the id in parameter
   *
   * @param {string} id of the video in the databse
   *
   * @return {Observable<Video | void>}
   */
  findById(id: string): Observable<Video | void> {
    return from(this._videoModel.findById(id))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }

  /**
   * Check if the video already exists with index and add it in videos list
   *
   * @param {CreateVideoDto} video to create
   *
   * @return {Observable<CreateVideoDto>}
   */
  create(video: CreateVideoDto): Observable<Video> {
    return from(this._videoModel.create(video))
      .pipe(
        map((doc: MongooseDocument) => doc.toJSON()),
      );
  }

  /**
   * Update a video in videos list
   *
   * @param {string} id of the video to update
   * @param {UpdateVideoDto} data of the video to update
   *
   * @return {Observable<Video | void>}
   */
  findByIdAndUpdate(id: string, user: UpdateVideoDto): Observable<Video | void> {
    return from(this._videoModel.findByIdAndUpdate(id, user, { new: true }))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }

  /**
   * Delete a video in videos list
   *
   * @param {string} id of the video to delete
   *
   * @return {Observable<Video | void>}
   */
  findByIdAndDelete(id: string): Observable<Video | void> {
    return from(this._videoModel.findByIdAndDelete(id))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }
}
