import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class VideoDto {
  @IsString()
  @IsNotEmpty()
  readonly link: string;

  @IsOptional()
  @IsNumber()
  readonly timestamp?: number;
}
