import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateVideoDto {
  @IsOptional()
  @IsNumber()
  readonly timestamp?: number;
}
