import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { stub } from 'sinon';
import { expect } from 'chai';

import { applyMiddlewares } from '../../mocks';
import { AuthorService } from '../../../src/modules/author/author.service';
import { AuthenticationGuard } from '../../../src/core/guard';
import { AuthorModule } from '../../../src/modules/author';

describe('AuthorController', () => {
  let app: INestApplication;
  let authorService: AuthorService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthorModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    applyMiddlewares(app);
    await app.init();

    authorService = app.get<AuthorService>(AuthorService);
  });

  describe('/author GET', () => {
    it('should return random author with 200 code', async () => {
      const canActivateStub = stub(AuthenticationGuard.prototype, 'canActivate').resolves(true);

      const getRandomAuthorStub = stub().resolves({
        authorId: 1,
        name: 'John Doe',
      });

      stub(authorService, 'getRandomAuthorAfterDelay').callsFake(getRandomAuthorStub);

      const response = await request.agent(app.getHttpServer()).get('/author').expect(200);

      expect(response.body.success).to.be.true;
      expect(response.body.data).to.deep.equal({ authorId: 1, name: 'John Doe' });
      expect(getRandomAuthorStub.calledOnce).to.be.true;

      canActivateStub.restore();
    });

    it('should throw forbidden error with 403 code when user is not authenticated', async () => {
      const response = await request.agent(app.getHttpServer()).get('/author').expect(403);

      expect(response.body.success).to.be.false;
      expect(response.body.data.message).to.equal('Forbidden resource');
    });
  });
});
