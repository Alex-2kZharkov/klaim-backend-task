import { Controller, Get } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyInfo } from './company.types';

@Controller({
  version: '1',
})
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('/info')
  getHello(): CompanyInfo {
    return this.companyService.getInfo();
  }
}
