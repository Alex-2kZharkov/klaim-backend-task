import { Controller, Get, UseGuards } from '@nestjs/common';
import { setTimeout } from 'node:timers/promises';

import { AuthenticationGuard } from '../../core/guard';
import { FIVE_SECONDS_DELAY } from '../../constants';
import { Author } from './author';
import { AuthorService } from './author.service';

@Controller({ version: '1' })
export class AuthorController {
  constructor(private authorService: AuthorService) {}

  @Get('/author')
  @UseGuards(AuthenticationGuard)
  async getRandomAuthor(): Promise<Author> {
    const author = await this.authorService.getRandomAuthor();
    return await setTimeout(FIVE_SECONDS_DELAY, author);
  }
}
