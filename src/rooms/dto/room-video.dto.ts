import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class RoomVideoDto {
  @IsString()
  @IsNotEmpty()
  readonly link: string;

  @IsOptional()
  @IsNumber()
  readonly timestamp?: number;
}
