import { Module } from '@nestjs/common';
import { CompanyModule } from './modules/company';

@Module({
  imports: [CompanyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
