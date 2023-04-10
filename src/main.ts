import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { APPLICATION_CONFIG } from './env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(APPLICATION_CONFIG.PORT || 8000);
}
bootstrap();
