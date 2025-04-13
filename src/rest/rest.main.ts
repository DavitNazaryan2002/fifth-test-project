import { NestFactory } from '@nestjs/core';
import { RestModule } from './rest.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(RestModule);

  const config = new DocumentBuilder()
    .setTitle('My App')
    .setDescription('Company and Projects management app')
    .setVersion('1.0')
    .addBasicAuth({
      type: 'http',
      scheme: 'basic',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


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
