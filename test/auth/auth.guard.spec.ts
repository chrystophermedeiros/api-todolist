import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from 'src/auth/auth.guard';

describe('AuthGuardGuard', () => {
  it('should be defined', () => {
    const jwtService = new JwtService();
    const configService = new ConfigService();
    expect(new AuthGuard(jwtService, configService)).toBeDefined();
  });
});
