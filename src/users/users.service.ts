import { ConflictException, Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/db/entites/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(newUser: UserDto) {
    const userExists = await this.findByEmail(
      newUser.email,
      newUser.usernameGitHub,
    );

    if (userExists) {
      if (userExists.email === newUser.email) {
        throw new ConflictException({
          message: 'E-mail já cadastrado',
          field: 'email',
        });
      }
      if (userExists.usernameGitHub === newUser.usernameGitHub) {
        throw new ConflictException({
          message: 'Username do GitHub já cadastrado',
          field: 'usernameGitHub',
        });
      }
    }

    const dbUser = new UserEntity();
    dbUser.name = newUser.name;
    dbUser.email = newUser.email;
    dbUser.usernameGitHub = newUser.usernameGitHub;
    dbUser.passwordHash = bcryptHashSync(newUser.password, 10);

    const { id, name, email, usernameGitHub } =
      await this.usersRepository.save(dbUser);

    return { id, name, email, usernameGitHub };
  }

  async findByEmail(
    email: string,
    usernameGitHub?: string,
  ): Promise<UserEntity | undefined> {
    const foundUser = await this.usersRepository.findOne({
      where: [{ email }, { usernameGitHub }],
    });

    return foundUser || undefined;
  }

  async findById(id: string): Promise<UserEntity | undefined> {
    const foundUser = await this.usersRepository.findOne({ where: { id } });

    return foundUser || undefined;
  }

  async findOne(id: string): Promise<UserEntity | undefined> {
    return this.findById(id);
  }
}
