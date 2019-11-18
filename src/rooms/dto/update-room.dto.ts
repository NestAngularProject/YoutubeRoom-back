import { Video } from '../../videos/interfaces/video.interface';
import { IsInstance, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { RoomVideoDto } from './room-video.dto';
import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class UpdateRoomDto {
  @ApiModelPropertyOptional({description: `Room's list of videos`})
  @IsOptional()
  @IsInstance(RoomVideoDto)
  @Type(() => RoomVideoDto)
  videos?: RoomVideoDto[];
}
