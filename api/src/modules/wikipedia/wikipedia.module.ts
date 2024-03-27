import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WikipediaService } from './wikipedia.service';

@Module({
  imports: [HttpModule],
  providers: [WikipediaService],
  exports: [WikipediaService],
})
export class WikipediaModule {}
