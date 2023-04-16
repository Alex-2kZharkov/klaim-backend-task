import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import * as request from 'supertest';

import { UserModule } from '../../../src/modules/user';
import { applyMiddlewares, MOCK_USER } from '../../mocks';
import { UserController } from '../../../src/modules/user/user.controller';
import { AuthenticatedRequest } from '../../../src/core/request';

describe('UserController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    applyMiddlewares(app);
    await app.init();
  });

  describe('/profile GET', () => {
    it('should return user profile when user is authenticated', async () => {
      const response = await request.agent(app.getHttpServer()).get('/profile').expect(403);

      expect(response.body.success).to.be.false;
      expect(response.body.data.message).to.equal('Forbidden resource');
    });

    it('should return user profile when user is authenticated', async () => {
      const result = await app
        .get<UserController>(UserController)
        .getProfile({ user: MOCK_USER } as AuthenticatedRequest);

      expect(result.fullname).to.equal('test test');
      expect(result.email).to.equal('test@gmail.com');
    });
  });
});
