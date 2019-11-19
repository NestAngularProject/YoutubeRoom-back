import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, MongooseDocument } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Room } from '../interfaces/room.interface';
import { CreateRoomDto } from '../dto/create-room.dto';
import { UpdateRoomDto } from '../dto/update-room.dto';

@Injectable()
export class RoomsDao {
  /**
   * Class constructor
   *
   * @param {Model<Room>} instance of the model representing a Room
   */
  constructor(@InjectModel('Room') private readonly _roomModel: Model<Room>) {
  }

  /**
   * Call mongoose method, call toJSON on each result and returns Room[] or undefined
   *
   * @return {Observable<Room[] | void>}
   */
  find(): Observable<Room[] | void> {
    return from(this._roomModel.find({}))
      .pipe(
        map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined),
      );
  }

  /**
   * Returns one room of the list matching the name in parameter
   *
   * @param {string} name of the room in the databse
   *
   * @return {Observable<Room | void>}
   */
  findOne(name_to_find: string): Observable<Room | void> {
    return from(this._roomModel.findOne({name: name_to_find}))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }

  /**
   * Returns one room of the list matching the name and password in parameter
   *
   * @param {string} name of the room in the databse
   * @param {string} password of the room in the databse
   *
   * @return {Observable<Room | void>}
   */
  findConnexion(name_to_find: string, password_to_find: string): Observable<Room | void> {
    return from(this._roomModel.findOne({name: name_to_find, password: password_to_find}))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }

  /**
   * Check if the room already exists with index and add it in rooms list
   *
   * @param {CreateRoomDto} room to create
   *
   * @return {Observable<Room>}
   */
  create(room: CreateRoomDto): Observable<Room> {
    return from(this._roomModel.create(room))
      .pipe(
        map((doc: MongooseDocument) => doc.toJSON()),
      );
  }

  /**
   * Update a room in rooms list
   *
   * @param {string} name of the room to update
   * @param {UpdateRoomDto} data of the room to update
   *
   * @return {Observable<Room | void>}
   */
  findOneAndUpdate(name_to_find: string, room: UpdateRoomDto): Observable<Room | void> {
    return from(this._roomModel.findOneAndUpdate({name: name_to_find}, room, { new: true }))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }

  /**
   * Delete a room in rooms list
   *
   * @param {string} name of the room to delete
   *
   * @return {Observable<Room | void>}
   */
  findOneAndDelete(name_to_find: string): Observable<Room | void> {
    return from(this._roomModel.findOneAndDelete({name: name_to_find}))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }
}
