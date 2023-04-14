import { Module } from '@nestjs/common';

import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { PrismaService } from '../../database';

@Module({
  imports: [],
  controllers: [AuthorController],
  providers: [AuthorService, PrismaService],
})
export class AuthorModule {}
