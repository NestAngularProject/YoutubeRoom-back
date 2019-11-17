import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class VideoEntity {
  @Expose()
  @Type(() => String)
  id: string;

  @Expose()
  @Type(() => String)
  link: string;

  @Expose()
  @Type(() => Number)
  timestamp: number;

  /**
   * Class constructor
   *
   * @param {Partial<VideoEntity>} partial data to insert in object instance
   */
  constructor(partial: Partial<VideoEntity>) {
    Object.assign(this, partial)
  }
}
