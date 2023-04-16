import { Injectable } from '@nestjs/common';
import { User as UserEntity } from '@prisma/client';

import { User, UserName } from './user.types';
import { PrismaService } from '../../database';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.prismaService.client.user.findUnique({ where: { email } });
  }

  async findById(id: string): Promise<UserEntity> {
    return await this.prismaService.client.user.findUnique({ where: { id } });
  }

  async saveUser(data: User): Promise<void> {
    await this.prismaService.client.user.create({ data });
  }

  parseFullname(fullname: string, separator: string): UserName {
    const [firstName, lastName] = fullname.split(separator);
    return { firstName, lastName };
  }

  getFullname({ firstName, lastName }: UserName, separator: string): string {
    return `${firstName}${separator}${lastName}`;
  }
}
