import { HttpException, HttpStatus } from '@nestjs/common';

export class WrongPasswordException extends HttpException {
  constructor(password: string) {
    super(`Wrong password ${password}`, HttpStatus.FORBIDDEN);
  }
}
