import { Video } from '../../videos/interfaces/video.interface';
import { IsInstance, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { VideoDto } from './video.dto';

export class UpdateRoomDto {
  @IsOptional()
  @IsInstance(VideoDto)
  @Type(() => VideoDto)
  readonly videos?: VideoDto[];
}
