import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new HttpExceptionFilter());

  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('port');
  const CORS_ORIGIN = configService.get<string>('cors.origin');

  app.enableCors({ origin: CORS_ORIGIN });

  await app.listen(PORT || 3000);
}
bootstrap();
