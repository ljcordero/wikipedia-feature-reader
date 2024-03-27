import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';
import { WikipediaModule } from './../../modules/wikipedia/wikipedia.module';
import { LibreTranslateModule } from './../../modules/libre-translate/libre-translate.module';
import { LibreTranslateLanguageSupportedValidation } from './validations/libre-translate-language-supported.validation';

@Module({
  imports: [WikipediaModule, LibreTranslateModule],
  providers: [FeedService, LibreTranslateLanguageSupportedValidation],
  controllers: [FeedController],
  exports: [FeedService],
})
export class FeedModule {}
