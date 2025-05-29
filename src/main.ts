import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  INestApplication,
  Logger,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { initializeTransactionalContext } from 'typeorm-transactional';

(async (): Promise<void> => {
  const port: number | string = process.env.PORT ?? 8000;

  initializeTransactionalContext();

  const app: INestApplication =
    await NestFactory.create<INestApplication>(AppModule);

  app.enableCors({
    origin: ['http://localhost:5173'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(port);
  Logger.log(`🚀 Application listening on http://localhost:${port}`);
})();
