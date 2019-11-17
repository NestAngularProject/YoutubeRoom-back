import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class UserEntity {
  @Expose()
  @Type(() => String)
  username: string;

  password: string;

  @Expose()
  @Type(() => String)
  mail: string;

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
