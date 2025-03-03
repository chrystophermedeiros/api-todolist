import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

import { compareSync as bcryptCompare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { AuthResponseDto } from './auth.dto';

@Injectable()
export class AuthService {
  private jwtExpirationTimeSeconds: number;
  constructor(
    private readonly userService: UsersService,
    private readonly jwtservice: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTimeSeconds =
      this.configService.get<number>('JWT_EXPIRATION') ?? 28800;
  }

  async singIn(email: string, password: string): Promise<AuthResponseDto> {
    const foundUser = await this.userService.findByEmail(email);

    if (!foundUser || !bcryptCompare(password, foundUser.passwordHash)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: foundUser.id, email: foundUser.email };
    const token = this.jwtservice.sign(payload);

    return {
      token,
      expiresIn: this.jwtExpirationTimeSeconds,
      userId: foundUser.id,
      user: {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        usernameGitHub: foundUser.usernameGitHub,
      },
    };
  }
}
