import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;

  @IsEmail()
  @IsNotEmpty()
  readonly mail: string;

  @IsOptional()
  @IsString()
  readonly room?: string;
}
