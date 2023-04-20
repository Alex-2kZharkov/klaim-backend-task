import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as passport from 'passport';
import * as session from 'express-session';

import { ResponseExceptionFilter, ResponseInterceptor } from '../../src/core/response';
import { APPLICATION_CONFIG } from '../../src/env';
import { ONE_MINUTE_IN_MILLISECONDS } from '../../src/constants';

export const applyMiddlewares = (app: INestApplication) => {
  app.use(
    session({
      secret: APPLICATION_CONFIG.SESSION_SECRET,
      cookie: { maxAge: ONE_MINUTE_IN_MILLISECONDS },
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new ResponseExceptionFilter());
};
