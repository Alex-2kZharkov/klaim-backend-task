import { Module } from '@nestjs/common';

import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { PrismaService } from '../../database';
import { RandomService } from '../../services';

@Module({
  imports: [],
  controllers: [AuthorController],
  providers: [AuthorService, PrismaService, RandomService],
})
export class AuthorModule {}
