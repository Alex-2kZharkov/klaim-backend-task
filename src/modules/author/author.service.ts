import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database';
import { Author as AuthorEntity } from '@prisma/client';

import { getRandomNumber } from '../../utils';
import { Author } from './author';

@Injectable()
export class AuthorService {
  private leastRandomAuthorRange = 1;
  constructor(private prismaService: PrismaService) {}

  async getRandomAuthor(): Promise<Author> {
    const authorsCount = await this.countAuthors();
    const { id: authorId, name } = await this.findOne(
      getRandomNumber(this.leastRandomAuthorRange, authorsCount),
    );
    return { authorId, name };
  }

  async countAuthors(): Promise<number> {
    return await this.prismaService.client.author.count();
  }

  async findOne(skip: number): Promise<AuthorEntity> {
    return this.prismaService.client.author.findFirst({ skip: skip - this.leastRandomAuthorRange });
  }
}
