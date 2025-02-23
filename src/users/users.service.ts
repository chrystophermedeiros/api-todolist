import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { v4 as uuid } from 'uuid';
import { hashSync as bcryptHashSync } from 'bcrypt';
@Injectable()
export class UsersService {
  private users: UserDto[] = [];
  create(newUser: UserDto) {
    newUser.id = uuid();
    newUser.password = bcryptHashSync(newUser.password, 10);
    this.users.push(newUser);
    console.log(this.users);
  }
  findByUSerEmail(email: string): UserDto | null {
    return this.users.find(user => user.email === email) || null;
  }

  findById(id: string): UserDto | null {
    return this.users.find(user => user.id === id) || null;
  }

  
}
