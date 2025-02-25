import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'email@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  password: string;
}

export class SessionResponseDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  expiresIn: number;

  @ApiProperty()
  userId: string;

  use: { id: string; name: string; usernameGitHub: string; email: string };
}
