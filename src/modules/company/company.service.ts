import { Injectable } from '@nestjs/common';
import { CompanyInfo } from './company.types';

@Injectable()
export class CompanyService {
  getInfo(): CompanyInfo {
    return { info: 'Some information about the <b>company</b>.' };
  }
}
