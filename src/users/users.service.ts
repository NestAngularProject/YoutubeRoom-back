import { ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { Observable, of, throwError } from 'rxjs';
import { catchError, flatMap, map} from 'rxjs/operators';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersDao } from './dao/users.dao';

@Injectable()
export class UsersService {
  /**
   * Class constructor
   */
  constructor(private readonly _usersDao: UsersDao) {
  }

  /**
   * Returns the list of users
   *
   * @returns {Observable<UserEntity[] | void>}
   */
  findAll(): Observable<UserEntity[] | void> {
    return this._usersDao.find()
      .pipe(
        map(_ => (!!_ && !!_.length) ? _.map(__ => new UserEntity(__)) : undefined),
      );
  }

  /**
   * Returns the list of users inside the room in parameter
   *
   * @param {string} name of the room
   *
   * @returns {Observable<UserEntity[] | void>}
   */
  findMany(room: string): Observable<UserEntity[] | void> {
    return this._usersDao.findMany(room)
      .pipe(
        catchError(e => throwError(new UnprocessableEntityException(e.message))),
        flatMap(_ =>
          !!_ ?
            of(_) :
            throwError(new NotFoundException(`Room with name '${room}' not found`)),
        ),
        map(_ => (!!_ && !!_.length) ? _.map(__ => new UserEntity(__)) : undefined),
      );
  }

  /**
   * Returns the user from users matching the username
   *
   * @param {string} username of the user
   *
   * @returns {Observable<UserEntity>}
   */
  findOne(username: string): Observable<UserEntity> {
    return this._usersDao.findOne(username)
      .pipe(
        catchError(e => throwError(new UnprocessableEntityException(e.message))),
        flatMap(_ =>
          !!_ ?
            of(new UserEntity(_)) :
            throwError(new NotFoundException(`User with username '${username}' not found`)),
        ),
      );
  }

  /**
   * Check if the user's username and password are valid
   *
   * @param {string} username of the user
   * @param {string} password of the user
   *
   * @returns {Observable<UserEntity>}
   */
  findConnexion(username: string, password: string): Observable<UserEntity> {
    return this._usersDao.findConnexion(username, password)
      .pipe(
        catchError(e => throwError(new UnprocessableEntityException(e.message))),
        flatMap(_ =>
          !!_ ?
            of(new UserEntity(_)) :
            throwError(new NotFoundException(`User with username '${username}' not found`)),
        ),
      );
  }

  /**
   * Check if the user already exists, if not, adds it in users list
   *
   * @param {CreateUserDto} user to create
   *
   * @returns {Observable<UserEntity>}
   */
  create(user: CreateUserDto): Observable<UserEntity> {
    return this._addUser(user)
      .pipe(
        flatMap(_ => this._usersDao.create(_)),
        catchError(e =>
          e.code = 11000 ?
            throwError(
              new ConflictException(`User with username '${user.username}' or email '${user.mail}' already exists`),
            ) :
            throwError(new UnprocessableEntityException(e.message)),
        ),
        map(_ => new UserEntity(_)),
      );
  }

  /**
   * Update a user in the users list
   *
   * @param {string} username of the user to update
   * @param {UpdateUserDto} user data to update
   *
   * @returns {Observable<User>}
   */
  update(username: string, user: UpdateUserDto): Observable<UserEntity> {
    return this._usersDao.findOneAndUpdate(username, user)
      .pipe(
        catchError(e =>
          e.code = 11000 ?
            throwError(
              new ConflictException(`User with username '${user.username}' or email '${user.mail}' already exists`),
            ) :
            throwError(new UnprocessableEntityException(e.message)),
        ),
        flatMap(_ =>
          !!_ ?
            of(new UserEntity((_))) :
            throwError(new NotFoundException(`User with username '${username}' not found`)),
        ),
      );
  }

  /**
   * Delete a user from the users list
   *
   * @param {string} username of the user
   *
   * @returns {Observable<void>}
   */
  delete(username: string): Observable<void> {
    return this._usersDao.findOneAndDelete(username)
      .pipe(
        catchError(e => throwError(new NotFoundException(e.message))),
        flatMap(_ =>
          !!_ ?
            of(undefined) :
            throwError(new NotFoundException(`User with username '${username}' not found`)),
        ),
      );
  }

  /**
   * Add a valid user in users list
   *
   * @param {CreateUserDto} user to add
   *
   * @returns {Observable<CreateUserDto>}
   *
   * @private
   */
  private _addUser(user: CreateUserDto): Observable<CreateUserDto> {
    return of(user)
      .pipe(
        map(_ =>
          Object.assign(_),
        ),
      );
  }

}
