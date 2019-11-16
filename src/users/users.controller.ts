import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { Observable, of } from 'rxjs';
import { USERS } from '../data/users';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
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
  findAll(): Observable<User[] | void> {
    return this._usersService.findAll();
  }

  /**
   * Handler to answer to /users/username route
   *
   * @returns Observable<User>
   */
  @Get(':username')
  findOne(@Param('username') username: string): Observable<User> {
    return this._usersService.findOne(username);
  }

  /**
   *
   */
  @Post()
  create(@Body() createUserDto: CreateUserDto): Observable<User> {
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
  update(@Body() updateUserDto: UpdateUserDto, @Param('username') username: string): Observable<User> {
    return this._usersService.update(updateUserDto, username);
  }
}
