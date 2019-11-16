export class CreateUserDto {
  readonly username: string;
  readonly password: string;
  readonly mail: string;
  readonly room?: string;
}
