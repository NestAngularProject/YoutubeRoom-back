import { Video } from '../../videos/interfaces/video.interface';
import { IsInstance, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { RoomVideoDto } from './room-video.dto';

export class UpdateRoomDto {
  @IsOptional()
  @IsInstance(RoomVideoDto)
  @Type(() => RoomVideoDto)
  readonly videos?: RoomVideoDto[];
}
