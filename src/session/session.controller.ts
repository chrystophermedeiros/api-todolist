import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { SessionResponseDto } from './session.dto';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
 async singIn(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<SessionResponseDto> {
    return await this.sessionService.singIn(email, password);
  }
}
