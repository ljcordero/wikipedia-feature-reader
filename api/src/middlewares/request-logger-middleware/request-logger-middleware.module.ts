import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { RequestLoggerMiddleware } from './request-logger-middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestLogger } from './request-logger-middleware.entity';
import { RequestLoggerMiddlewareService } from './request-logger-middleware.service';

@Module({
  imports: [TypeOrmModule.forFeature([RequestLogger])],
  providers: [RequestLoggerMiddlewareService],
})
export class RequestLoggerMiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(RequestLoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
