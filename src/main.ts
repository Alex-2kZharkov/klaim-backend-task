import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as passport from 'passport';

import { AppModule } from './app.module';
import { APPLICATION_CONFIG } from './env';
import { ResponseExceptionFilter, ResponseInterceptor } from './core/response';
import { expressSession } from './core/session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning();
  app.enableCors({ origin: APPLICATION_CONFIG.ORIGIN });
  app.use(expressSession());
  app.use(passport.initialize());
  app.use(passport.session());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new ResponseExceptionFilter());

  await app.listen(APPLICATION_CONFIG.PORT || 8000);
}
bootstrap();
