import { ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Observable, of, throwError } from 'rxjs';
import { catchError, flatMap, map} from 'rxjs/operators';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { WrongPasswordException } from './exceptions/wrong-password.exception';
import { RoomEntity } from './entities/room.entity';
import { RoomsDao } from './dao/rooms.dao';

@Injectable()
export class RoomsService {
  /**
   * Class constructor
   */
  constructor(private readonly _roomsDao: RoomsDao) {
  }

  /**
   * Returns the list of rooms
   *
   * @returns {Observable<RoomEntity[] | void>}
   */
  findAll(): Observable<RoomEntity[] | void> {
    return this._roomsDao.find()
      .pipe(
        map(_ => (!!_ && !!_.length) ? _.map(__ => new RoomEntity(__)) : undefined),
      );
  }

  /**
   * Return the room with name from rooms list
   *
   * @param {string} name of the room
   *
   * @returns {Observable<RoomEntity>}
   */
  findOne(name: string): Observable<RoomEntity> {
    return this._roomsDao.findOne(name)
      .pipe(
        catchError(e => throwError(new UnprocessableEntityException(e.message))),
        flatMap(_ =>
          !!_ ?
            of(new RoomEntity(_)) :
            throwError(new NotFoundException(`Room with name '${name}' not found `)),
        ),
      );
  }

  /**
   * Check if the password of the room is valid
   *
   * @param {string} name of the room
   * @param {string} password of the room
   *
   * @returns {Observable<RoomEntity>}
   */
  findConnexion(name: string, password: string): Observable<RoomEntity> {
    return this._roomsDao.findConnexion(name, password)
      .pipe(
        catchError(e => throwError(new UnprocessableEntityException(e.message))),
        flatMap(_ =>
          !!_ ?
            of(new RoomEntity(_)) :
            throwError(new WrongPasswordException()),
        ),
      );
  }

  /**
   * Check if the room already exists, if not, adds it in rooms list
   *
   * @param {CreateRoomDto} data to create the room
   *
   * @returns {Observable<RoomEntity>}
   */
  create(room: CreateRoomDto): Observable<RoomEntity> {
    return this._addRoom(room)
      .pipe(
        flatMap(_ => this._roomsDao.create(_)),
        catchError(e =>
          e.code = 11000 ?
            throwError(
              new ConflictException(`Room with name '${room.name}' already exists`),
            ) :
            throwError(new UnprocessableEntityException(e.message)),
        ),
        map(_ => new RoomEntity(_)),
      );
  }

  /**
   * Update the room in rooms list
   *
   * @param {string} name of the room to update
   * @param {UpdateRoomDto} data of the room to update
   *
   * @returns {Observable<RoomEntity>}
   */
  update(name: string, room: UpdateRoomDto): Observable<RoomEntity> {
    return this._roomsDao.findOneAndUpdate(name, room)
      .pipe(
        catchError(e => throwError(new NotFoundException(e.message))),
        flatMap(_ =>
          !!_ ?
            of(new RoomEntity((_))) :
            throwError(new NotFoundException(`Room with name '${name}' not found`)),
        ),
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
    return this._roomsDao.findOneAndDelete(name)
      .pipe(
        catchError(e => throwError(new NotFoundException(e.message))),
        flatMap(_ =>
          !!_ ?
            of(undefined) :
            throwError(new NotFoundException(`Room with name '${name}' not found`)),
        ),
      );
  }

  /**
   * Add a valid room in rooms list
   *
   * @param {CreateRoomDto}
   *
   * @returns {Observable<CreateRoomDto>}
   *
   * @private
   */
  private _addRoom(room: CreateRoomDto): Observable<CreateRoomDto> {
    return of(room)
      .pipe(
        map(_ =>
          Object.assign(_),
        ),
      );
  }
}
