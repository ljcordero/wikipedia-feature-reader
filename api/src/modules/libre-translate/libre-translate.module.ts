import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LibreTranslateService } from './libre-translate.service';

@Module({
  imports: [HttpModule],
  providers: [LibreTranslateService],
  exports: [LibreTranslateService],
})
export class LibreTranslateModule {}
