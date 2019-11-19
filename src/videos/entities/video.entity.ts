import { Exclude, Expose, Type } from 'class-transformer';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

@Exclude()
export class VideoEntity {
  @ApiModelProperty({description: 'Unique identifier in the databse', example: 'strcngsml8lqm1z'})
  @Expose()
  @Type(() => String)
  id: string;

  @ApiModelProperty({description: 'Youtube link of the video', example: 'https://www.youtube.com/watch?v=hTWKbfoikeg'})
  @Expose()
  @Type(() => String)
  link: string;

  @ApiModelPropertyOptional({description: 'Timestamp of the video', example: 70})
  @Expose()
  @Type(() => Number)
  timestamp: number;

  @ApiModelProperty({description: 'Set to true if the video has already been seen', example: false})
  @Expose()
  @Type(() => Boolean)
  seen: boolean

  @ApiModelProperty({description: 'Name of the room where the video has been created', example: 'Chill'})
  @Expose()
  @Type(() => String)
  room: string;

  /**
   * Class constructor
   *
   * @param {Partial<VideoEntity>} partial data to insert in object instance
   */
  constructor(partial: Partial<VideoEntity>) {
    Object.assign(this, partial);
  }
}
