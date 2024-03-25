import { Controller, Get } from '@nestjs/common';
import { ApiInformation, AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getApiInformation(): ApiInformation {
    return this.appService.getApiInformation();
  }
}
