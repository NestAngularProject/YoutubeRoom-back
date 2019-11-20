import { Exclude, Expose, Type } from 'class-transformer';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

@Exclude()
export class RoomEntity {
  @ApiModelProperty({description: 'Name of the room', example: 'Chill'})
  @Expose()
  @Type(() => String)
  name: string;

  @ApiModelProperty({description: 'Password of the room', example: 'P455wOrD-75'})
  password: string;

  @ApiModelPropertyOptional({description: 'Unique identifier of the current video', example: '5dd49c0ed9fe78e237497df8'})
  @Expose()
  @Type(() => String)
  currentVideoID: string;

  @ApiModelPropertyOptional({description: 'Timestamp of the current video', example: '20'})
  @Expose()
  @Type(() => Number)
  timestamp: number;

  /**
   * Class constructor
   *
   * @param {Partial<RoomEntity>} partial data to insert in object instance
   */
  constructor(partial: Partial<RoomEntity>) {
    Object.assign(this, partial);
  }
}
