import { Injectable, Logger } from '@nestjs/common';
import { WikipediaService } from './../../modules/wikipedia/wikipedia.service';
import { FeedRequestDto } from './dtos/feed-request.dto';
import Mappers from './mappers';
import { getYearMonthDay } from './../../utils/date';
import { FeedResponseDto } from './dtos/feed-response.dto';
import { DEFAULT_WIKIPEDIA_LANGUAGE } from './constants';
import { LibreTranslateService } from './../../modules/libre-translate/libre-translate.service';
import { WikipediaSupportedLanguage } from './../../modules/wikipedia/wikipedia-supported-language';

@Injectable()
export class FeedService {
  private readonly logger = new Logger(FeedService.name);

  constructor(
    private readonly wikipediaService: WikipediaService,
    private readonly libreTranslateService: LibreTranslateService,
  ) {}

  async getFeaturedContent(
    query: FeedRequestDto,
  ): Promise<FeedResponseDto | null> {
    try {
      const { year, month, day } = getYearMonthDay(query.date);

      const featuredContent = await this.wikipediaService.getFeaturedContent(
        query.language || DEFAULT_WIKIPEDIA_LANGUAGE,
        year,
        month,
        day,
      );

      if (featuredContent?.tfa === undefined) {
        this.logger.warn(
          `empty Today's featured article (TFA) for date: ${query.date} language: ${query.language}`,
        );
        return null;
      }

      return Mappers.wikipediaFeaturedContentDtoToFeedResponseDto(
        featuredContent,
      );
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }

  async getTranslatedFeaturedContent(
    query: FeedRequestDto,
    language: string,
  ): Promise<FeedResponseDto | null> {
    // Dot not call the Libre Translate API if Wikipedia API support the desired language
    if (
      Object.values(WikipediaSupportedLanguage).includes(
        language as WikipediaSupportedLanguage,
      )
    ) {
      query.language = language as WikipediaSupportedLanguage;
    } else {
      // Set featured content language to English `en` for better compatibility
      query.language = DEFAULT_WIKIPEDIA_LANGUAGE;
    }

    const featuredContent = await this.getFeaturedContent(query);

    if (featuredContent != null && query.language != language) {
      try {
        // We need to translate 3 text `title`, `description` & `extract`
        // but the Libre Translate API does not support input array text
        // as a workaround will concatenate the texts and split later
        const separator = '\n';

        const text = [
          featuredContent.title,
          featuredContent.description,
          featuredContent.extract,
        ].join(separator);

        const { translatedText } = await this.libreTranslateService.translate(
          text,
          DEFAULT_WIKIPEDIA_LANGUAGE,
          language,
        );

        const splitted = translatedText.split(separator);

        featuredContent.title = splitted[0];
        featuredContent.description = splitted[1];
        featuredContent.extract = splitted[2];
      } catch (error) {
        this.logger.error(error);
      }
    }

    return featuredContent;
  }
}
