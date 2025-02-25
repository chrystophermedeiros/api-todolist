import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'email@example.com' })
  email: string;

  @ApiProperty({ example: 'password123' })
  password: string;
}

export class SessionResponseDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  expiresIn: number;

  @ApiProperty()
  userId: string;
}
