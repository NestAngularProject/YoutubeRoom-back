import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { Observable } from 'rxjs';
import { Room } from './interfaces/room.interface';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomsModule } from './rooms.module';
import { UpdateVideoDto } from '../videos/dto/update-video.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { User } from '../users/interfaces/user.interface';

@Controller('rooms')
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
  findAll(): Observable<Room[] | void> {
    return this._roomsService.findAll();
  }

  /**
   * Handler to answer /rooms/name route
   *
   * @param {string}
   *
   * @returns {Observable<Room>}
   */
  @Get(':name')
  findOne(@Param('name') name: string): Observable<Room> {
    return this._roomsService.findOne(name);
  }

  /**
   * Handler to answer /rooms/name/password route
   *
   * @param {string}
   * @param {string}
   *
   * @returns {Observable<Room>}
   */
  @Get(':name/:password')
  findConnection(@Param('name') name: string, @Param('password') password: string): Observable<Room> {
    return this._roomsService.findConnection(name, password);
  }

  /**
   * Handler to answer /rooms route
   *
   * @param {CreateRoomDto}
   *
   * @returns {Observable<Room>}
   */
  @Post()
  create(@Body() createRoomDto: CreateRoomDto): Observable<Room> {
    return this._roomsService.create(createRoomDto);
  }

  /**
   * Handler to answer /rooms/name route
   *
   * @param {UpdateRoomDto}
   * @param {string}
   *
   * @returns {Observable<Room>}
   */
  @Put(':name')
  update(@Body() updateRoomDto: UpdateRoomDto, @Param('name') name: string): Observable<Room> {
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
