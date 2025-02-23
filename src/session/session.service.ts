import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SessionResponseDto } from './session.dto';
import { compareSync as bcryptCompare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SessionService {
  private jwtExpirationTimeSeconds: number;
  constructor(
    private readonly userService: UsersService,
    private readonly jwtservice: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTimeSeconds = this.configService.get<number>(
      'JWT_EXPIRATION'
    ) ?? 28800;
  }

  singIn(email: string, password: string): SessionResponseDto {
    const foundUser = this.userService.findByUSerEmail(email);

    if (!foundUser || !bcryptCompare(password, foundUser.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: foundUser.id, email: foundUser.email };
    const token = this.jwtservice.sign(payload);

    return { token, expiresIn: this.jwtExpirationTimeSeconds };
  }
}
