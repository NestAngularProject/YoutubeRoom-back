import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { Observable} from 'rxjs';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import {
  ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse,
  ApiImplicitBody,
  ApiImplicitParam,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse, ApiUnprocessableEntityResponse,
  ApiUseTags,
} from '@nestjs/swagger';

@ApiUseTags('users')
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
   * Handler to answer to GET /users route
   *
   * @returns Observable<User[] | void>
   */
  @ApiOkResponse({description: 'Returns an array of user', type: UserEntity, isArray: true})
  @ApiNoContentResponse({description: 'No user exists in database'})
  @Get()
  findAll(): Observable<UserEntity[] | void> {
    return this._usersService.findAll();
  }

  /**
   * Handler to answer to GET /users/room route
   *
   * @returns Observable<User[] | void>
   */
  @ApiOkResponse({description: 'Returns an array of user', type: UserEntity, isArray: true})
  @ApiNotFoundResponse({description: 'Room with the given name doesn\'t exist in the database'})
  @ApiNoContentResponse({description: 'No user exists in room'})
  @ApiBadRequestResponse({description: 'Parameter provided is not good'})
  @ApiUnprocessableEntityResponse({description: `The request can't be performed in the database`})
  @ApiImplicitParam({name: 'room', description: 'Name of the room', type: String})
  @Get('room/:room')
  findMany(@Param('room') room: string): Observable<UserEntity[] | void> {
    return this._usersService.findMany(room);
  }

  /**
   * Handler to answer to GET /users/username route
   *
   * @param {string} username of the user
   *
   * @returns Observable<UserEntity>
   */
  @ApiOkResponse({description: 'Returns one user for the given username', type: UserEntity})
  @ApiNotFoundResponse({description: 'User with the given username doesn\'t exist in the database'})
  @ApiBadRequestResponse({description: 'Parameter provided is not good'})
  @ApiUnprocessableEntityResponse({description: `The request can't be performed in the database`})
  @ApiImplicitParam({name: 'username', description: 'Username of the user in the database', type: String})
  @Get(':username')
  findOne(@Param('username') username: string): Observable<UserEntity> {
    return this._usersService.findOne(username);
  }

  /**
   * Handler to answer to GET /users/username/password route
   *
   * @param {string} username of the user
   * @param {string} password of the user
   *
   * @returns Observable<UserEntity>
   */
  @ApiOkResponse({description: 'Returns one user for the given username and password', type: UserEntity})
  @ApiNotFoundResponse({description: 'User with the given username doesn\'t exist in the database'})
  @ApiBadRequestResponse({description: 'Parameters provided are not good'})
  @ApiUnprocessableEntityResponse({description: `The request can't be performed in the database`})
  @ApiImplicitParam({name: 'username', description: 'Username of the user in the database', type: String})
  @ApiImplicitParam({name: 'password', description: 'Password of the user in the database', type: String})
  @Get(':username/:password')
  findConnection(@Param('username') username: string, @Param('password') password: string): Observable<UserEntity> {
    return this._usersService.findConnexion(username, password);
  }

  /**
   * Handler to answer to POST /users route
   *
   * @returns Observable<User>
   */
  @ApiCreatedResponse({ description: 'The user has been successfully created', type: UserEntity })
  @ApiConflictResponse({ description: 'The user already exists in the database' })
  @ApiBadRequestResponse({ description: 'Payload provided is not good' })
  @ApiUnprocessableEntityResponse({description: `The request can't be performed in the database`})
  @ApiImplicitBody({ name: 'CreateUserDto', description: 'Payload to create a new user', type: CreateUserDto })
  @Post()
  create(@Body() createUserDto: CreateUserDto): Observable<UserEntity> {
    return this._usersService.create(createUserDto);
  }

  /**
   * Handler to answer to PUT /users/username route
   *
   * @param {string} username of the user to update
   * @param {UpdateUserDto} data of the user to update
   *
   * @returns Observable<UserEntity>
   */
  @ApiOkResponse({ description: 'The user has been successfully updated', type: UserEntity })
  @ApiNotFoundResponse({ description: 'User with the given username doesn\'t exist in the database' })
  @ApiBadRequestResponse({ description: 'Parameter and/or payload provided are not good' })
  @ApiUnprocessableEntityResponse({description: `The request can't be performed in the database`})
  @ApiImplicitParam({ name: 'username', description: 'Username of the user in the database', type: String })
  @ApiImplicitBody({ name: 'UpdateUserDto', description: 'Payload to update a user', type: UpdateUserDto })
  @Put(':username')
  update(@Param('username') username: string, @Body() updateUserDto: UpdateUserDto): Observable<UserEntity> {
    return this._usersService.update(username, updateUserDto);
  }

  /**
   * Handler to answer to DELETE /users/username route
   *
   * @param {string} username of the user to delete
   *
   * @returns {Observable<void>}
   */
  @ApiNoContentResponse({ description: 'The user has been successfully deleted' })
  @ApiNotFoundResponse({ description: 'User with the given username doesn\'t exist in the database' })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({description: `The request can't be performed in the database`})
  @ApiImplicitParam({ name: 'username', description: 'Username of the user in the database', type: String })
  @Delete(':username')
  delete(@Param('username') username: string): Observable<void> {
    return this._usersService.delete(username);
  }
}
