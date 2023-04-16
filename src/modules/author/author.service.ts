import { Injectable } from '@nestjs/common';
import { setTimeout } from 'node:timers/promises';

import { PrismaService } from '../../database';
import { Author as AuthorEntity } from '@prisma/client';
import { Author } from './author.types';
import { RandomService } from '../../services';

@Injectable()
export class AuthorService {
  private leastRandomAuthorRange = 1;
  constructor(private prismaService: PrismaService, private randomService: RandomService) {}

  async getRandomAuthorAfterDelay(delay: number): Promise<Author> {
    const startTime = Date.now();
    const author = await this.getRandomAuthor();
    return await setTimeout(delay - (Date.now() - startTime), author);
  }

  async getRandomAuthor(): Promise<Author> {
    const authorsCount = await this.countAuthors();
    const { id: authorId, name } = await this.findOne(
      this.randomService.getRandomNumber(this.leastRandomAuthorRange, authorsCount),
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
