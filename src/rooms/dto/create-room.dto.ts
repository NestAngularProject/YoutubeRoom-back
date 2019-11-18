import { IsNotEmpty, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateRoomDto {
  @ApiModelProperty({description: 'Name of the room', example: 'Chill'})
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiModelProperty({description: 'Password of the room', example: 'P455wOrD-75'})
  @IsString()
  @IsNotEmpty()
  password: string;
}
