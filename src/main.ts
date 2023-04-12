import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { APPLICATION_CONFIG } from './env';
import { ResponseInterceptor } from './core/response';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(APPLICATION_CONFIG.PORT || 8000);
}
bootstrap();
