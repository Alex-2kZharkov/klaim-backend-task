import { setTimeout } from 'node:timers/promises';
import { Injectable } from '@nestjs/common';
import { Quote as QuoteEntity } from '@prisma/client';

import { PrismaService } from '../../database';
import { Quote } from './quote.types';
import { RandomService } from '../../services';

@Injectable()
export class QuoteService {
  private leastRandomQuoteRange = 1;
  constructor(private prismaService: PrismaService, private randomService: RandomService) {}

  async getRandomQuoteAfterDelay(authorId: number, delay: number): Promise<Quote> {
    const [quote] = await Promise.all([this.getRandomQuote(authorId), setTimeout(delay)]);
    return quote;
  }

  async getRandomQuote(authorIdParam: number): Promise<Quote> {
    const { authorId, id: quoteId, quote } = (await this.findOneRandom(authorIdParam)) ?? {};
    return { authorId, quoteId, quote };
  }

  async findOneRandom(authorId: number): Promise<QuoteEntity | null> {
    return this.prismaService.client.quote.findFirst({
      where: { authorId },
      skip: await this.countRandomQuoteSkip(authorId),
    });
  }

  async countRandomQuoteSkip(authorId: number): Promise<number> {
    const quotesCount = await this.prismaService.client.quote.count({ where: { authorId } });
    return (
      this.randomService.getRandomNumber(this.leastRandomQuoteRange, quotesCount) -
      this.leastRandomQuoteRange
    );
  }
}
