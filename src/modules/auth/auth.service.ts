import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { RegisterUserDto } from './auth.dto';
import { UserService } from '../user';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async registerUser({ email, password, fullname }: RegisterUserDto): Promise<void> {
    const hashPassword = await bcrypt.hash(password, 10);
    await this.userService.saveUser({
      email,
      password: hashPassword,
      ...this.userService.parseFullname(fullname, ' '),
    });
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    const doesPasswordMatch = await bcrypt.compare(password, user?.password ?? '');

    if (doesPasswordMatch) {
      return { ...user, password: null };
    }

    return null;
  }
}
