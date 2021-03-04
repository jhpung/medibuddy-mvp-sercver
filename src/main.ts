import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('메디버디 MVP 프로젝트 1')
    .setDescription('병원 진료 프로세스 MVP')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.enableCors();
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
