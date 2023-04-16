import { Module } from '@nestjs/common';

import { CompanyModule } from './modules/company';
import { AuthModule } from './modules/auth';
import { UserModule } from './modules/user';
import { AuthorModule } from './modules/author';
import { QuoteModule } from './modules/quote';

@Module({
  imports: [AuthModule, AuthorModule, CompanyModule, QuoteModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
