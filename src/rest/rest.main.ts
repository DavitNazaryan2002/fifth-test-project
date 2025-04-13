import { NestFactory } from '@nestjs/core';
import { RestModule } from './rest.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(RestModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    }),
  );

  await app.listen(3000);
}
bootstrap();
