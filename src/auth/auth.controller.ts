import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto, AuthResponseDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Entra no sistema' })
  @ApiResponse({ status: 200, description: 'retorna um token e userId' })
  async singIn(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return await this.authService.singIn(loginDto.email, loginDto.password);
  }
}
