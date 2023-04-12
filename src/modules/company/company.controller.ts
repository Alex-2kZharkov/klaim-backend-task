import { Controller, Get } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyInfo } from './company.types';

@Controller()
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('/info')
  getHello(): CompanyInfo {
    return this.companyService.getInfo();
  }
}
