import { Exclude, Expose, Type } from 'class-transformer';
import { RoomVideoEntity } from './room-video.entity';
import { ApiModelProperty } from '@nestjs/swagger';

@Exclude()
export class RoomEntity {
  @ApiModelProperty({description: 'Name of the room', example: 'Chill'})
  @Expose()
  @Type(() => String)
  name: string;

  @ApiModelProperty({description: 'Password of the room', example: 'P455wOrD-75'})
  password: string;

  @ApiModelProperty({description: `Room's list of videos`})
  @Expose()
  @Type(() => RoomVideoEntity)
  videos: RoomVideoEntity[];

  /**
   * Class constructor
   *
   * @param {Partial<RoomEntity>} partial data to insert in object instance
   */
  constructor(partial: Partial<RoomEntity>) {
    Object.assign(this, partial);
  }
}
