import { Module } from '@nestjs/common';

import { CompanyModule } from './modules/company';
import { AuthModule } from './modules/auth';
import { UserModule } from './modules/user';
import { AuthorModule } from './modules/author';

@Module({
  imports: [AuthModule, CompanyModule, UserModule, AuthorModule, AuthorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
