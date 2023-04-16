import { setTimeout } from 'node:timers/promises';
import { Injectable } from '@nestjs/common';
import { Author as AuthorEntity } from '@prisma/client';

import { PrismaService } from '../../database';
import { Author } from './author.types';
import { RandomService } from '../../services';

@Injectable()
export class AuthorService {
  private leastRandomAuthorRange = 1;
  constructor(private prismaService: PrismaService, private randomService: RandomService) {}

  async getRandomAuthorAfterDelay(delay: number): Promise<Author> {
    const [author] = await Promise.all([this.getRandomAuthor(), setTimeout(delay)]);
    return author;
  }

  async getRandomAuthor(): Promise<Author> {
    const { id: authorId, name } = await this.findOneRandom();
    return { authorId, name };
  }

  async findOneRandom(): Promise<AuthorEntity> {
    return this.prismaService.client.author.findFirst({ skip: await this.countRandomAuthorSkip() });
  }

  async countRandomAuthorSkip(): Promise<number> {
    const authorCount = await this.prismaService.client.author.count();
    return (
      this.randomService.getRandomNumber(this.leastRandomAuthorRange, authorCount) -
      this.leastRandomAuthorRange
    );
  }
}
