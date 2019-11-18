import { Exclude, Expose, Type } from 'class-transformer';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

@Exclude()
export class RoomVideoEntity {
  @ApiModelProperty({description: 'Unique identifier of the video in the database', example: 'strcngsml8lqm1z'})
  @Expose()
  @Type(() => String)
  id: string;

  @ApiModelProperty({description: 'Youtube link of the video', example: 'https://youtu.be/hTWKbfoikeg'})
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
  seen: boolean;
}
