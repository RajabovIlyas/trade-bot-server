import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ZodValidationPipe } from 'nestjs-zod';
import { Logger } from '@nestjs/common';
import { loggerOption } from './options/logger.option';
import configDevelopment from './config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const { port: PORT, globalPrefix: GLOBAL_PREFIX } = configDevelopment;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: loggerOption,
  });

  const config = new DocumentBuilder()
    .setTitle('Trade bot')
    .setVersion('1.0')
    .build();

  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.useGlobalPipes(new ZodValidationPipe());

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(GLOBAL_PREFIX, app, document);

  await app.listen(PORT);
  Logger.log(
    `🚀 Application is running on: http://localhost:${PORT}${GLOBAL_PREFIX}`,
  );
}

bootstrap();
