import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { UserService } from '../user';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  serializeUser(user: User, done: CallableFunction): void {
    done(null, user.id);
  }

  async deserializeUser(userId: string, done: CallableFunction): Promise<void> {
    const user = await this.userService.findById(userId);
    done(null, { ...user, password: null });
  }
}
