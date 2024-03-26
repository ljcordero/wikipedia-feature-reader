import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestLogger } from './request-logger-middleware.entity';

@Injectable()
export class RequestLoggerMiddlewareService {
  private readonly logger = new Logger(RequestLoggerMiddlewareService.name);

  constructor(
    @InjectRepository(RequestLogger)
    private requestLoggerRepository: Repository<RequestLogger>,
  ) {}

  async create(newRequestLogger: RequestLogger) {
    try {
      await this.requestLoggerRepository.save(newRequestLogger);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
