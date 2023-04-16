import { SinonStub, stub } from 'sinon';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import * as request from 'supertest';
import { expect } from 'chai';

import { applyMiddlewares, MOCK_USER } from '../../mocks';
import { AuthModule } from '../../../src/modules/auth';
import { UserService } from '../../../src/modules/user';
import { LocalStrategy } from '../../../src/modules/auth/auth.local.strategy';
import { AuthenticationGuard } from '../../../src/core/guard';

describe('AuthController', () => {
  let app: INestApplication;
  let userService: UserService;
  let localStrategy: LocalStrategy;

  const loginData = {
    email: 'test@gmail.com',
    password: 'password123',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    applyMiddlewares(app);

    await app.init();

    userService = app.get<UserService>(UserService);
    localStrategy = app.get<LocalStrategy>(LocalStrategy);
  });

  describe('/register POST', () => {
    let saveUserStub: SinonStub;

    beforeEach(() => {
      saveUserStub = stub(userService, 'saveUser');
    });

    afterEach(() => {
      saveUserStub.restore();
    });

    it('should create user and return 201 code', async () => {
      const user = {
        email: 'test@example.com',
        password: 'password123',
        fullname: 'John Doe',
      };

      const response = await request(app.getHttpServer()).post('/register').send(user).expect(201);

      expect(response.body.success).to.be.true;
      expect(response.body.data).to.eql({});
      expect(saveUserStub.callCount).to.equal(1);
    });

    it('should fail with 400 code when one of the fields is empty', async () => {
      const response = await request(app.getHttpServer()).post('/register').send().expect(400);

      expect(response.body.success).to.be.false;
      expect(response.body.data.message).to.include.members([
        'email should not be empty',
        'fullname should not be empty',
        'password should not be empty',
      ]);
      expect(saveUserStub.callCount).to.equal(0);
    });

    it('should fail with 400 code when fields are present but do not satisfy validation', async () => {
      const user = {
        email: 'test',
        password: '123',
        fullname: 123,
      };

      const response = await request(app.getHttpServer()).post('/register').send(user).expect(400);

      expect(response.body.success).to.be.false;
      expect(response.body.data.message).to.include.members([
        'email must be an email',
        'fullname must be a string',
        'password must be longer than or equal to 6 characters',
      ]);
      expect(saveUserStub.callCount).to.equal(0);
    });
  });

  describe('/login POST', () => {
    let localStrategyValidateStub: SinonStub;

    it('should login user successfully and return 200 code', async () => {
      localStrategyValidateStub = stub(localStrategy, 'validate').resolves(MOCK_USER);

      const response = await request(app.getHttpServer())
        .post('/login')
        .send(loginData)
        .expect(200);

      expect(response.body.success).to.be.true;
      expect(response.body.data.token).to.be.a('string').that.is.not.empty;
      expect(localStrategyValidateStub.calledOnce).to.be.true;

      localStrategyValidateStub.restore();
    });

    it('should throw 401 error when credentials are not valid', async () => {
      localStrategyValidateStub = stub(localStrategy, 'validate').resolves(null);

      const response = await request(app.getHttpServer())
        .post('/login')
        .send(loginData)
        .expect(401);

      expect(response.body.success).to.be.false;
      expect(response.body.data.token).to.be.undefined;
      expect(response.body.data.message).to.equal('Unauthorized');
      expect(localStrategyValidateStub.calledOnce).to.be.true;

      localStrategyValidateStub.restore();
    });
  });

  describe('/logout DELETE', () => {
    it('should logout user from session', async () => {
      const canActivateStub = stub(AuthenticationGuard.prototype, 'canActivate').resolves(true);

      const response = await request.agent(app.getHttpServer()).delete('/logout').expect(200);

      expect(response.body.success).to.be.true;
      expect(response.body.data).to.eql({});

      canActivateStub.restore();
    });

    it('should throw forbidden error with 403 code when user is not authenticated', async () => {
      const response = await request.agent(app.getHttpServer()).delete('/logout').expect(403);

      expect(response.body.success).to.be.false;
      expect(response.body.data.message).to.equal('Forbidden resource');
    });
  });
});
