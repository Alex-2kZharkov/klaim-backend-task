import { Injectable } from '@nestjs/common';
import { User, UserName } from './user.types';
import { PrismaService } from '../../database';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async saveUser(user: User): Promise<object> {
    await this.prismaService.client.user.create({ data: user });
    return {};
  }

  parseFullname(fullname: string, separator: string): UserName {
    const [firstName, lastName] = fullname.split(separator);
    return { firstName, lastName };
  }
}
