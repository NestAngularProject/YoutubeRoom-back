import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomSchema } from './schemas/room.schema';
import { RoomsDao } from './dao/rooms.dao';

@Module({
  imports: [ MongooseModule.forFeature([{name: 'Room', schema: RoomSchema}])],
  controllers: [RoomsController],
  providers: [RoomsService, RoomsDao],
})
export class RoomsModule {}
