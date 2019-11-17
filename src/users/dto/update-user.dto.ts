import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  readonly username?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  readonly password?: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  readonly mail?: string;

  @IsOptional()
  @IsString()
  readonly room?: string;
}
