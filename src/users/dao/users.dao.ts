import { Injectable } from '@nestjs/common';
import { Model, MongooseDocument } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../interfaces/user.interface';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersDao {
  /**
   * Class constructor
   *
   * @param {Model<User>} instance of the model representing a User
   */
  constructor(@InjectModel('User') private readonly _userModel: Model<User>) {
  }

  /**
   * Call mongoose method, call toJSON on each result and returns User[] or undefined
   *
   * @return {Observable<User[] | void>}
   */
  find(): Observable<User[] | void> {
    return from(this._userModel.find({}))
      .pipe(
        map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined),
      );
  }

  /**
   * Returns all user from the room in parameter
   *
   * @param {string} name of the room in the database
   *
   * @return {Observable<User[] | void>}
   */
  findMany(roomName: string): Observable<User[] | void> {
    return from(this._userModel.find({room: roomName}))
      .pipe(
        map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined),
      );
  }

  /**
   * Returns one user of the list matching the username in parameter
   *
   * @param {string} username of the user in the database
   *
   * @return {Observable<User | void>}
   */
  findOne(username_to_find: string): Observable<User | void> {
    return from(this._userModel.findOne({username: username_to_find}))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }

  /**
   * Returns one user of the list matching the username and password in parameter
   *
   * @param {string} username of the user in the databse
   * @param {string} password of the user in the databse
   *
   * @return {Observable<User | void>}
   */
  findConnexion(username_to_find: string, password_to_find: string): Observable<User | void> {
    return from(this._userModel.findOne({username: username_to_find, password: password_to_find}))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }

  /**
   * Check if the user already exists with index and add it in users list
   *
   * @param {CreateUserDto} user to create
   *
   * @return {Observable<User>}
   */
  create(user: CreateUserDto): Observable<User> {
    return from(this._userModel.create(user))
      .pipe(
        map((doc: MongooseDocument) => doc.toJSON()),
      );
  }

  /**
   * Update a user in users list
   *
   * @param {string} username of the user to update
   * @param {UpdateUserDto} data of the user to update
   *
   * @return {Observable<User | void>}
   */
  findOneAndUpdate(username_to_find: string, user: UpdateUserDto): Observable<User | void> {
    return from(this._userModel.findOneAndUpdate({username: username_to_find}, user, { new: true }))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }

  /**
   * Delete a user in users list
   *
   * @param {string} username of the user to delete
   *
   * @return {Observable<User | void>}
   */
  findOneAndDelete(username_to_find: string): Observable<User | void> {
    return from(this._userModel.findOneAndDelete({username: username_to_find}))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }
}
