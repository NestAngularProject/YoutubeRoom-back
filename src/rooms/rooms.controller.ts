import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { Observable } from 'rxjs';
import { Room } from './interfaces/room.interface';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomEntity } from './entities/room.entity';

@Controller('rooms')
@UseInterceptors(ClassSerializerInterceptor)
export class RoomsController {
  /**
   * Class controller
   * @param _roomsService
   */
  constructor(private readonly _roomsService: RoomsService) {}

  /**
   * Handler to answer /rooms route
   */
  @Get()
  findAll(): Observable<RoomEntity[] | void> {
    return this._roomsService.findAll();
  }

  /**
   * Handler to answer /rooms/name route
   *
   * @param {string}
   *
   * @returns {Observable<RoomEntity>}
   */
  @Get(':name')
  findOne(@Param('name') name: string): Observable<RoomEntity> {
    return this._roomsService.findOne(name);
  }

  /**
   * Handler to answer /rooms/name/password route
   *
   * @param {string}
   * @param {string}
   *
   * @returns {Observable<RoomEntity>}
   */
  @Get(':name/:password')
  findConnection(@Param('name') name: string, @Param('password') password: string): Observable<RoomEntity> {
    return this._roomsService.findConnection(name, password);
  }

  /**
   * Handler to answer /rooms route
   *
   * @param {CreateRoomDto}
   *
   * @returns {Observable<RoomEntity>}
   */
  @Post()
  create(@Body() createRoomDto: CreateRoomDto): Observable<RoomEntity> {
    return this._roomsService.create(createRoomDto);
  }

  /**
   * Handler to answer /rooms/name route
   *
   * @param {UpdateRoomDto}
   * @param {string}
   *
   * @returns {Observable<RoomEntity>}
   */
  @Put(':name')
  update(@Body() updateRoomDto: UpdateRoomDto, @Param('name') name: string): Observable<RoomEntity> {
    return this._roomsService.update(updateRoomDto, name);
  }

  /**
   * Handler to answer /rooms/name route
   *
   * @param {string}
   *
   * @returns {Observable<void>}
   */
  @Delete(':name')
  delete(@Param('name') name: string): Observable<void> {
    return this._roomsService.delete(name);
  }
}
