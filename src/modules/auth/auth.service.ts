import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

import { RegisterUserDto } from './auth.dto';
import { UserService } from '../user';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async registerUser({ email, password, fullname }: RegisterUserDto): Promise<object> {
    return await this.userService.saveUser({
      email,
      password: this.hashPassword(password),
      ...this.userService.parseFullname(fullname, ' '),
    });
  }

  generateSalt(): string {
    return crypto.randomBytes(16).toString('hex');
  }

  hashPassword(password: string): string {
    const hash = crypto.createHash('sha256');
    hash.update(password + this.generateSalt());
    return hash.digest('hex');
  }
}
