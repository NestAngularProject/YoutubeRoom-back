import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { Observable, of } from 'rxjs';
import { USERS } from '../data/users';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  /**
   * Class constructor
   * @param _usersService
   */
  constructor(private readonly _usersService: UsersService) {
  }

  /**
   * Handler to answer to /users route
   *
   * @returns Observable<User[]>
   */
  @Get()
  findAll(): Observable<UserEntity[] | void> {
    return this._usersService.findAll();
  }

  /**
   * Handler to answer to /users/username route
   *
   * @returns Observable<User>
   */
  @Get(':username')
  findOne(@Param('username') username: string): Observable<UserEntity> {
    return this._usersService.findOne(username);
  }

  @Get(':username/:password')
  findConnection(@Param('username') username: string, @Param('password') password: string): Observable<UserEntity> {
    return this._usersService.findConnection(username, password);
  }

  /**
   * Handler to answer to /users route
   *
   * @returns Observable<User>
   */
  @Post()
  create(@Body() createUserDto: CreateUserDto): Observable<UserEntity> {
    return this._usersService.create(createUserDto);
  }

  /**
   * Handler to answer to /users/username route
   *
   * @param {UpdateUserDto} data of the user to update
   * @param {string} username of the user to update
   *
   * @returns Observable<User>
   */
  @Put(':username')
  update(@Body() updateUserDto: UpdateUserDto, @Param('username') username: string): Observable<UserEntity> {
    return this._usersService.update(updateUserDto, username);
  }

  /**
   * Handler to answer to /users/username route
   *
   * @param {string} username of the user to delete
   *
   * @returns {Observable<void>}
   */
  @Delete(':username')
  delete(@Param('username') username: string): Observable<void>{
    return this._usersService.delete(username);
  }
}
