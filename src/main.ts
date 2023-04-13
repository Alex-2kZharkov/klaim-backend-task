import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import * as connectPgSimple from 'connect-pg-simple';
import { Pool } from 'pg';

import { AppModule } from './app.module';
import { APPLICATION_CONFIG } from './env';
import { ResponseExceptionFilter, ResponseInterceptor } from './core/response';

const pgPool = new Pool({
  connectionString: APPLICATION_CONFIG.DATABASE_URL,
});
const pgSession = connectPgSimple(session);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning();
  app.use(
    session({
      store: new pgSession({
        pool: pgPool,
        tableName: 'tokens',
      }),
      secret: APPLICATION_CONFIG.SESSION_SECRET,
      cookie: { maxAge: 60 * 1000 }, // 1 minute
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new ResponseExceptionFilter());

  await app.listen(APPLICATION_CONFIG.PORT || 8000);
}
bootstrap();
