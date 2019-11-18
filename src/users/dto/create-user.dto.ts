import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiModelProperty({description: 'Username of the user', example: 'Elude'})
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  username: string;

  @ApiModelProperty({description: 'Password of the user', example: 'P455w0rD-75'})
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiModelProperty({description: 'Email of the user', example: 'elude@gmail.com'})
  @IsEmail()
  @IsNotEmpty()
  mail: string;

  @ApiModelPropertyOptional({description: 'Room where the user is', example: 'Chill'})
  @IsOptional()
  @IsString()
  room?: string;
}
