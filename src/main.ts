import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { APPLICATION_CONFIG } from './env/env.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(APPLICATION_CONFIG.PORT || 8000);
}
bootstrap();
