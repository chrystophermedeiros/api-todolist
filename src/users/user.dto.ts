import {
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  @MinLength(5)
  @MaxLength(100)
  @ApiProperty()
  name: string;

  @IsEmail()
  @MinLength(10)
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(50)
  @ApiProperty()
  usernameGitHub: string;

  @IsString()
  @MinLength(8)
  @ApiProperty()
  password: string;
}

export class FindUserByIdDto {
  @IsUUID()
  @ApiProperty()
  id: string;
}
