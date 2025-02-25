import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
  Get,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { FindUserByIdDto, UserDto } from './user.dto';
import { SessionGuard } from 'src/session/session.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Criação de um novo usuário' })
  async create(@Body() user: UserDto) {
    try {
      const createdUser = await this.usersService.create(user);
      return {
        message: 'Usuário criado com sucesso!',
        user: createdUser.name,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { message: 'Erro ao criar usuário' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @UseGuards(SessionGuard)
  @ApiBearerAuth('token')
  @Get('findById')
  @ApiOperation({ summary: 'Busca um usuário pelo ID' })
  async findById(@Headers() findUserByIdDto: FindUserByIdDto) {
    const user = await this.usersService.findById(findUserByIdDto.id);

    if (!user) {
      throw new HttpException(
        { message: 'Usuário não encontrado' },
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      message: 'Usuário encontrado com sucesso',
      user: {
        id: user.id,
        name: user.name,
        usernameGitHub: user.usernameGitHub,
      },
    };
  }
}
