import { Controller, Get, Param, Query } from '@nestjs/common';
import { FeedRequestDto } from './dtos/feed-request.dto';
import { FeedService } from './feed.service';
import { TranslateLanguageParamDto } from './dtos/translate-language-param.dto';
import { FeedResponseDto } from './dtos/feed-response.dto';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  async get(@Query() query: FeedRequestDto): Promise<FeedResponseDto | null> {
    return await this.feedService.getFeaturedContent(query);
  }

  @Get('translate/:language')
  async getTranslated(
    @Query() query: FeedRequestDto,
    @Param() param: TranslateLanguageParamDto,
  ): Promise<FeedResponseDto | null> {
    return await this.feedService.getTranslatedFeaturedContent(
      query,
      param.language,
    );
  }
}
