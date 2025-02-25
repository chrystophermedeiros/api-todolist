import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto, SessionResponseDto } from './session.dto';
import { SessionService } from './session.service';

@Controller('session')
@ApiTags('Sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Entra no sistema' })
  @ApiResponse({ status: 200, description: 'retorna um token e userId' })
  async singIn(@Body() loginDto: LoginDto): Promise<SessionResponseDto> {
    return await this.sessionService.singIn(loginDto.email, loginDto.password);
  }
}
