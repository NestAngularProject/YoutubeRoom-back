import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { USERS } from '../data/users';
import { from, Observable, of, throwError } from 'rxjs';
import { find, findIndex, flatMap, map, tap } from 'rxjs/operators';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  // private property to store users
  private _users: User[];

  /**
   * Class constructor
   */
  constructor() {
    this._users = USERS;
  }

  /**
   * Returns the list of users
   *
   * @returns {Observable<UserEntity[] | void>}
   */
  findAll(): Observable<UserEntity[] | void> {
    return of(this._users)
      .pipe(
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
    return from(this._users)
      .pipe(
        find(_ => _.username === username),
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
  findConnection(username: string, password: string): Observable<UserEntity> {
    return from(this._users)
      .pipe(
        find(_ => _.username === username && _.password === password),
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
  create(user: CreateUserDto) {
    return from(this._users)
      .pipe(
        find(_ => _.username === user.username || _.mail === user.mail),
        flatMap(_ =>
          !!_ ?
            throwError(new ConflictException(`User with username '${user.username}' or mail '${user.mail}' already exists`),
            ) :
            this._addUser(user),
        ),
      );
  }

  /**
   * Add a valid user in users list
   *
   * @param {CreateUserDto} user to add
   *
   * @returns {Observable<UserEntity>}
   *
   * @private
   */
  private _addUser(user: CreateUserDto): Observable<UserEntity> {
    return of(user)
      .pipe(
        map(_ =>
          Object.assign(_) as User,
        ),
        tap(_ => this._users = this._users.concat(_)),
        map(_ => new UserEntity(_)),
      );
  }

  /**
   * Update a user in the users list
   *
   * @param {UpdateUserDto} user data to update
   * @param {string} username of the user to update
   *
   * @returns {Observable<User>}
   */
  update(user: UpdateUserDto, username: string): Observable<UserEntity> {
    return this._findUserIndexOfList(username)
      .pipe(
        tap(_ => Object.assign(this._users[_], user)),
        map(_ => new UserEntity(this._users[_])),
      );
  }

  /**
   * Finds index of array for the user
   *
   * @param {string} username of the user to find
   *
   * @returns {Observable<number>}
   *
   * @private
   */
  private _findUserIndexOfList(username: string): Observable<number> {
    return from(this._users)
      .pipe(
        findIndex(_ => _.username === username),
        flatMap(_ => _ > -1 ?
        of(_) :
        throwError(new NotFoundException(`User with username '${username}' not found`)),
        ),
      );
  }

  delete(username: string): Observable<void> {
    return this._findUserIndexOfList(username)
      .pipe(
        tap(_ => this._users.splice(_, 1)),
        map(() => undefined),
      );
  }
}
