import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class RoomVideoEntity {
  @Expose()
  @Type(() => String)
  id: string;

  @Expose()
  @Type(() => String)
  link: string;

  @Expose()
  @Type(() => Number)
  timestamp: number;
}
