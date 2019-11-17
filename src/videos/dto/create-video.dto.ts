import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateVideoDto {
  @IsString()
  @IsNotEmpty()
  readonly link: string;

  @IsOptional()
  @IsNumber()
  readonly timestamp?: number;
}
