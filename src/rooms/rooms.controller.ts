import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { Observable } from 'rxjs';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomEntity } from './entities/room.entity';
import {
  ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse,
  ApiForbiddenResponse, ApiImplicitBody,
  ApiImplicitParam,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUseTags,
} from '@nestjs/swagger';

@ApiUseTags('rooms')
@Controller('rooms')
@UseInterceptors(ClassSerializerInterceptor)
export class RoomsController {
  /**
   * Class controller
   *
   * @param _roomsService
   */
  constructor(private readonly _roomsService: RoomsService) {}

  /**
   * Handler to answer to GET /rooms route
   *
   * @returns {Observable<RoomEntity[] | void>}
   */
  @ApiOkResponse({description: 'Returns an array of room', type: RoomEntity, isArray: true})
  @ApiNoContentResponse({description: 'No room exists in database'})
  @Get()
  findAll(): Observable<RoomEntity[] | void> {
    return this._roomsService.findAll();
  }

  /**
   * Handler to answer to GET /rooms/name route
   *
   * @param {string} name of the room
   *
   * @returns {Observable<RoomEntity>}
   */
  @ApiOkResponse({ description: 'Returns the room for the given name', type: RoomEntity })
  @ApiNotFoundResponse({ description: 'Room with the given name doesn\'t exist in the database' })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiImplicitParam({ name: 'name', description: 'Name of the room in the database', type: String })
  @Get(':name')
  findOne(@Param('name') name: string): Observable<RoomEntity> {
    return this._roomsService.findOne(name);
  }

  /**
   * Handler to answer to GET /rooms/name/password route
   *
   * @param {string} name of the room
   * @param {string} password of the room
   *
   * @returns {Observable<RoomEntity>}
   */
  @ApiOkResponse({description: 'Returns one room for the given name and password', type: RoomEntity})
  @ApiForbiddenResponse({description: 'The password given is wrong'})
  @ApiBadRequestResponse({description: 'Parameters provided are not good'})
  @ApiImplicitParam({name: 'name', description: 'Name of the room in the database', type: String})
  @ApiImplicitParam({name: 'password', description: 'Password of the room in the database', type: String})
  @Get(':name/:password')
  findConnection(@Param('name') name: string, @Param('password') password: string): Observable<RoomEntity> {
    return this._roomsService.findConnection(name, password);
  }

  /**
   * Handler to answer to POST /rooms route
   *
   * @param {CreateRoomDto} data of the room to create
   *
   * @returns {Observable<RoomEntity>}
   */
  @ApiCreatedResponse({ description: 'The room has been successfully created', type: RoomEntity })
  @ApiConflictResponse({ description: 'The room already exists in the database' })
  @ApiBadRequestResponse({ description: 'Payload provided is not good' })
  @ApiImplicitBody({ name: 'RoomCreateDto', description: 'Payload to create a new room', type: CreateRoomDto })
  @Post()
  create(@Body() createRoomDto: CreateRoomDto): Observable<RoomEntity> {
    return this._roomsService.create(createRoomDto);
  }

  /**
   * Handler to answer to PUT /rooms/name route
   *
   * @param {UpdateRoomDto} data of the room to update
   * @param {string} name of the room to update
   *
   * @returns {Observable<RoomEntity>}
   */
  @ApiOkResponse({ description: 'The room has been successfully updated', type: RoomEntity })
  @ApiNotFoundResponse({ description: 'Room with the given name doesn\'t exist in the database' })
  @ApiBadRequestResponse({ description: 'Parameter and/or payload provided are not good' })
  @ApiImplicitBody({ name: 'UpdateRoomDto', description: 'Payload to update a room', type: UpdateRoomDto })
  @ApiImplicitParam({ name: 'name', description: 'Name of the room in the database', type: String })
  @Put(':name')
  update(@Body() updateRoomDto: UpdateRoomDto, @Param('name') name: string): Observable<RoomEntity> {
    return this._roomsService.update(updateRoomDto, name);
  }

  /**
   * Handler to answer to DELETE /rooms/name route
   *
   * @param {string} name of the room to delete
   *
   * @returns {Observable<void>}
   */
  @ApiNoContentResponse({ description: 'The room has been successfully deleted' })
  @ApiNotFoundResponse({ description: 'Room with the given name doesn\'t exist in the database' })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiImplicitParam({ name: 'name', description: 'Name of the room in the database', type: String })
  @Delete(':name')
  delete(@Param('name') name: string): Observable<void> {
    return this._roomsService.delete(name);
  }
}
