import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Room } from './interfaces/room.interface';
import { ROOMS } from '../data/rooms';
import { from, Observable, of, throwError } from 'rxjs';
import { find, findIndex, flatMap, map, tap } from 'rxjs/operators';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateVideoDto } from '../videos/dto/update-video.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { User } from '../users/interfaces/user.interface';
import { WrongPasswordException } from '../users/exceptions/wrong-password.exception';

@Injectable()
export class RoomsService {
  // private property to store the rooms
  private _rooms: Room[];

  /**
   * Class constructor
   */
  constructor() {
    this._rooms = ROOMS;
  }

  /**
   * Returns the list of rooms
   *
   * @returns {Observable<Room[] | void>}
   */
  findAll(): Observable<Room[] | void> {
    return of(this._rooms)
      .pipe(
        map(_ => (!!_ && !!_.length) ? _ : undefined),
      );
  }

  /**
   * Return the room with name from rooms list
   *
   * @param {string}
   *
   * @returns {Observable<Room>}
   */
  findOne(name: string): Observable<Room> {
    return from(this._rooms)
      .pipe(
        find(_ => _.name === name),
        flatMap(_ =>
          !!_ ?
            of(_) :
            throwError(new NotFoundException(`Room with name '${name}' not found `)),
        ),
      );
  }

  /**
   * Check if the password of the room is valid
   *
   * @param {string} username of the user
   * @param {string} password of the user
   *
   * @returns {Observable<User>}
   */
  findConnection(name: string, password: string): Observable<Room> {
    return from(this._rooms)
      .pipe(
        find(_ => _.name === name && _.password === password),
        flatMap(_ =>
          !!_ ?
            of(_) :
            throwError(new WrongPasswordException()),
        ),
      );
  }

  /**
   * Check if the room already exists, if not, adds it in rooms list
   *
   * @param {CreateRoomDto} data to create the room
   *
   * @returns {Observable<Room>}
   */
  create(room: CreateRoomDto): Observable<Room> {
    return from(this._rooms)
      .pipe(
        find(_ => _.name === room.name),
        flatMap(_ =>
          !!_ ?
            throwError(new ConflictException(`Room with name '${room.name}' already exists`),
            ) :
            this._addRoom(room),
        ),
      );
  }

  /**
   * Update the room in rooms list
   *
   * @param {UpdateRoomDto} data of the room to update
   * @param {string} name of the room to update
   *
   * @returns {Observable<Room>}
   */
  update(room: UpdateRoomDto, name: string) {
      return this._findRoomIndexOfList(name)
        .pipe(
          tap(_ => Object.assign(this._rooms[_], room)),
          map(_ => this._rooms[_]),
        );
  }

  /**
   * Delete the room from rooms list
   *
   * @param {string} name of the room to delete
   *
   * @returns {Observable<void>}
   */
  delete(name: string): Observable<void> {
    return this._findRoomIndexOfList(name)
      .pipe(
        tap(_ => this._rooms.splice(_, 1)),
        map(() => undefined),
      );
  }

  /**
   * Finds index of array for the room
   *
   * @param {string} name of the room
   *
   * @returns {Observable<number>}
   *
   * @private
   */
  private _findRoomIndexOfList(name: string): Observable<number> {
    return from(this._rooms)
      .pipe(
        findIndex(_ => _.name === name),
        flatMap(_ => _ > -1 ?
          of(_) :
          throwError(new NotFoundException(`Room with name '${name}' not found`)),
        ),
      );
  }

  /**
   * Add a valid room in rooms list
   *
   * @param {CreateRoomDto}
   *
   * @returns {Observable<Room>}
   *
   * @private
   */
  private _addRoom(room: CreateRoomDto): Observable<Room> {
    return of(room)
      .pipe(
        map(_ =>
          Object.assign(_) as Room,
        ),
        tap(_ => this._rooms = this._rooms.concat(_)),
      );
  }
}
