import { IsEmail, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export class UserDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  @MinLength(5)
  @MaxLength(100)
  name: string;

  @IsEmail()
  @MinLength(10)
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(50)
  usernameGitHub: string;

  @IsString()
  @MinLength(8)
  password: string;
}
