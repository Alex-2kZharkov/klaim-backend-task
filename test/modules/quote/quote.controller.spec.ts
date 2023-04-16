import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import * as request from 'supertest';
import { stub } from 'sinon';

import { QuoteService } from '../../../src/modules/quote/quote.service';
import { applyMiddlewares } from '../../mocks';
import { QuoteModule } from '../../../src/modules/quote';
import { AuthenticationGuard } from '../../../src/core/guard';

describe('QuoteController', () => {
  let app: INestApplication;
  let quoteService: QuoteService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [QuoteModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    applyMiddlewares(app);
    await app.init();

    quoteService = app.get<QuoteService>(QuoteService);
  });

  describe('/quote GET', () => {
    const quote = {
      quoteId: 1,
      authorId: 1,
      quote: 'Test quote',
    };

    it('should return random quote with 200 code for specified author', async () => {
      const canActivateStub = stub(AuthenticationGuard.prototype, 'canActivate').resolves(true);
      const getRandomQuoteStub = stub().resolves(quote);

      stub(quoteService, 'getRandomQuoteAfterDelay').callsFake(getRandomQuoteStub);

      const response = await request
        .agent(app.getHttpServer())
        .get('/quote?authorId=1')
        .expect(200);

      expect(response.body.success).to.be.true;
      expect(response.body.data).to.deep.equal(quote);
      expect(getRandomQuoteStub.calledOnce).to.be.true;
      expect(getRandomQuoteStub.calledWith(1, 5000)).to.be.true;

      canActivateStub.restore();
    });

    it('should return random quote with 200 code for random author', async () => {
      const canActivateStub = stub(AuthenticationGuard.prototype, 'canActivate').resolves(true);
      const getRandomQuoteStub = stub().resolves(quote);

      stub(quoteService, 'getRandomQuoteAfterDelay').callsFake(getRandomQuoteStub);

      const response = await request.agent(app.getHttpServer()).get('/quote').expect(200);

      expect(response.body.success).to.be.true;
      expect(response.body.data).to.deep.equal(quote);
      expect(getRandomQuoteStub.calledOnce).to.be.true;
      expect(getRandomQuoteStub.calledWith(undefined, 5000)).to.be.true;

      canActivateStub.restore();
    });

    it('should throw bad request error with 403 code when authorId is not valid number', async () => {
      const canActivateStub = stub(AuthenticationGuard.prototype, 'canActivate').resolves(true);

      const response = await request
        .agent(app.getHttpServer())
        .get('/quote?authorId=bad-id')
        .expect(400);

      expect(response.body.success).to.be.false;
      expect(response.body.data.message).to.equal('bad-id is not an integer');

      canActivateStub.restore();
    });

    it('should throw forbidden error with 403 code when user is not authenticated', async () => {
      const response = await request
        .agent(app.getHttpServer())
        .get('/quote?authorId=1')
        .expect(403);

      expect(response.body.success).to.be.false;
      expect(response.body.data.message).to.equal('Forbidden resource');
    });
  });
});
