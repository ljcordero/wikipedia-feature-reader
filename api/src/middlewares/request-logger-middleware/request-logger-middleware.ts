import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RequestLoggerMiddlewareService } from './request-logger-middleware.service';
import { RequestLogger } from './request-logger-middleware.entity';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(
    private requestLoggerMiddlewareService: RequestLoggerMiddlewareService,
  ) {}

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, hostname, method, path, body, query } = request;

    response.on('close', () => {
      const { statusCode } = response;

      this.requestLoggerMiddlewareService.create(
        new RequestLogger(
          ip || hostname,
          method,
          path,
          JSON.stringify(query),
          body,
          statusCode,
        ),
      );
    });

    next();
  }
}
