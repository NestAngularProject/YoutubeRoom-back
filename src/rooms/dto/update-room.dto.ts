import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class UpdateRoomDto {
  @ApiModelPropertyOptional({description: `Unique identifier of the current video`, example: '5dd49c0ed9fe78e237497df8'})
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  currentVideoID?: string;

  @ApiModelPropertyOptional({description: `Timestamp of the current video`, example: '20'})
  @IsOptional()
  @IsNumber()
  timestamp?: string;
}
