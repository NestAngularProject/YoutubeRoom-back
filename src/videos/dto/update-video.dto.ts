import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class UpdateVideoDto {
  @ApiModelPropertyOptional({description: 'Timestamp of the video', example: 70})
  @IsOptional()
  @IsNumber()
  timestamp?: number;

  @ApiModelPropertyOptional({description: 'Set to true if the video has already been seen', example: false})
  @IsOptional()
  @IsBoolean()
  seen?: boolean;
}
