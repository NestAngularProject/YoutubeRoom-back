import { Exclude, Expose, Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

@Exclude()
export class UserEntity {
  @ApiModelProperty({description: 'Username of the user', example: 'Elude'})
  @Expose()
  @Type(() => String)
  username: string;

  @ApiModelProperty({description: 'Password of the user', example: 'P455w0rD-75'})
  password: string;

  @ApiModelProperty({description: 'Email of the user', example: 'elude@gmail.com'})
  @Expose()
  @Type(() => String)
  mail: string;

  @ApiModelProperty({description: 'Room where the user is', example: 'Chill'})
  @Expose()
  @Type(() => String)
  room: string;

  /**
   * Class constructor
   *
   * @param {Partial<VideoEntity>} partial data to insert in object instance
   */
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
