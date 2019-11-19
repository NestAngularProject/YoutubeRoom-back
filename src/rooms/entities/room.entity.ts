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

  @ApiModelPropertyOptional({description: 'Unique identifier of the current video', example: 'strcngsml8lqm1z'})
  @Expose()
  @Type(() => String)
  currentVideoID: string;
  /**
   * Class constructor
   *
   * @param {Partial<RoomEntity>} partial data to insert in object instance
   */
  constructor(partial: Partial<RoomEntity>) {
    Object.assign(this, partial);
  }
}
