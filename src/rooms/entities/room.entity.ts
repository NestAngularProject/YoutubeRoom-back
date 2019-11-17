import { Exclude, Expose, Type } from 'class-transformer';
import { RoomVideoEntity } from './room-video.entity';

@Exclude()
export class RoomEntity {
  @Expose()
  @Type(() => String)
  name: string;

  password: string;

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
