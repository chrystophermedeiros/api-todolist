import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { SessionResponseDto } from './session.dto';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  singIn(
    @Body('email') email: string,
    @Body('password') password: string,
  ): SessionResponseDto {
    return this.sessionService.singIn(email, password);
  }
}
