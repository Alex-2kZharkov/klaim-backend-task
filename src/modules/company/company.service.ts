import { Injectable } from '@nestjs/common';
import { CompanyInfo } from './company.types';

@Injectable()
export class CompanyService {
  getInfo(): CompanyInfo {
    return { info: 'Little story about the company' };
  }
}
