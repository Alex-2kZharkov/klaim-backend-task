import { Controller, Get, Query, UseGuards } from '@nestjs/common';

import { FIVE_SECONDS_DELAY } from '../../constants';
import { QuoteService } from './quote.service';
import { Quote } from './quote.types';
import { ParseIntPipe } from '../../core/pipes';
import { AuthenticationGuard } from '../../core/guard';

@Controller({ version: '1' })
export class QuoteController {
  constructor(private quoteService: QuoteService) {}

  @Get('/quote')
  @UseGuards(AuthenticationGuard)
  async getRandomQuote(
    @Query('authorId', new ParseIntPipe())
    authorId?: number,
  ): Promise<Quote> {
    return await this.quoteService.getRandomQuoteAfterDelay(authorId, FIVE_SECONDS_DELAY);
  }
}
