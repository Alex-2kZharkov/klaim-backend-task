import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as passport from 'passport';
import * as fs from 'fs';

import { AppModule } from './app.module';
import { APPLICATION_CONFIG } from './env';
import { ResponseExceptionFilter, ResponseInterceptor } from './core/response';
import { expressSession } from './core/session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem'),
    },
  });

  app.setGlobalPrefix('api');
  app.enableVersioning();
  app.enableCors({ origin: APPLICATION_CONFIG.ORIGIN, credentials: true });
  app.use(expressSession());
  app.use(passport.initialize());
  app.use(passport.session());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new ResponseExceptionFilter());

  await app.listen(APPLICATION_CONFIG.PORT || 8000);
}
bootstrap();
