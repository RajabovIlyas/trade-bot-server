import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ZodValidationPipe } from 'nestjs-zod';
import { Logger } from '@nestjs/common';

const PORT = 3000;
const GLOBAL_PREFIX = '/api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.useGlobalPipes(new ZodValidationPipe());

  await app.listen(PORT);
  Logger.log(
    `🚀 Application is running on: http://localhost:${PORT}${GLOBAL_PREFIX}`,
  );
}

bootstrap();
