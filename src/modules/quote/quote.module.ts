import { Module } from '@nestjs/common';

import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';
import { PrismaService } from '../../database';
import { RandomService } from '../../services';

@Module({
  imports: [],
  controllers: [QuoteController],
  providers: [QuoteService, PrismaService, RandomService],
})
export class QuoteModule {}
