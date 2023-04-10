import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyService {
  getInfo(): string {
    return 'Some information about the <b>company</b>.';
  }
}
