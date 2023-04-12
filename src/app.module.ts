import { Module } from '@nestjs/common';

import { CompanyModule } from './modules/company';
import { AuthModule } from './modules/auth';
import { UserModule } from './modules/user';

@Module({
  imports: [AuthModule, CompanyModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
