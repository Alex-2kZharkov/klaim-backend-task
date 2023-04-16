import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { expect } from 'chai';

import { CompanyModule } from '../../../../src/modules/company';
import { ResponseInterceptor } from '../../../../src/core/response';

describe('CompanyController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CompanyModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalInterceptors(new ResponseInterceptor());
    await app.init();
  });

  it('/info GET', () => {
    return request(app.getHttpServer())
      .get('/info')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body).to.deep.equals({
          success: true,
          data: {
            info: 'Some information about the <b>company</b>.',
          },
        });
      });
  });
});
