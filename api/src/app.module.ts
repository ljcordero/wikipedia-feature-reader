import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Configuration from './config/configuration';
import typeormFactory from './config/typeorm';
import { RequestLoggerMiddlewareModule } from './middlewares/request-logger-middleware/request-logger-middleware.module';
import { FeedModule } from './modules/feed/feed.module';

@Module({
  imports: [
    Configuration,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: typeormFactory,
      inject: [ConfigService],
    }),
    RequestLoggerMiddlewareModule,
    FeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
