import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiModelPropertyOptional({description: 'Username of the user', example: 'Elude'})
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  username?: string;

  @ApiModelPropertyOptional({description: 'Password of the user', example: 'P455w0rD-75'})
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password?: string;

  @ApiModelPropertyOptional({description: 'Email of the user', example: 'elude@gmail.com'})
  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  mail?: string;

  @ApiModelPropertyOptional({description: 'Room where the user is', example: 'Chill'})
  @IsOptional()
  @IsString()
  room?: string;
}
