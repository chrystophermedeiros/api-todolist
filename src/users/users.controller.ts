import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './user.dto';
import { UserEntity } from 'src/db/entites/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
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
        { message: 'Erro ao criar usuário', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('findById')
  async findById(@Body() id: string): Promise<UserEntity | undefined> {
    return this.usersService.findById(id);
  }
}
