import { Controller, Get, UseGuards } from '@nestjs/common';

import { AuthenticationGuard } from '../../core/guard';
import { FIVE_SECONDS_DELAY } from '../../constants';
import { Author } from './author.types';
import { AuthorService } from './author.service';

@Controller({ version: '1' })
export class AuthorController {
  constructor(private authorService: AuthorService) {}

  @Get('/author')
  @UseGuards(AuthenticationGuard)
  async getRandomAuthor(): Promise<Author> {
    return await this.authorService.getRandomAuthorAfterDelay(FIVE_SECONDS_DELAY);
  }
}
