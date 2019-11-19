import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class UpdateRoomDto {
  @ApiModelPropertyOptional({description: `Unique identifier of the video`, example: 'strcngsml8lqm1z'})
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  currentVideoID?: string;
}
