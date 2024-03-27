import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { WikipediaSupportedLanguage } from './wikipedia-supported-language';
import { WikipediaFeaturedContentDto } from './dtos/wikipedia-featured-content.dto';

@Injectable()
export class WikipediaService {
  private readonly logger = new Logger(WikipediaService.name);

  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getFeaturedContent(
    language: WikipediaSupportedLanguage,
    year: string,
    month: string,
    day: string,
  ): Promise<WikipediaFeaturedContentDto> {
    try {
      return (
        await firstValueFrom(
          this.httpService.get(
            `${this.configService.get<string>('wikipedia.url')}/feed/v1/wikipedia/${language}/featured/${year}/${month}/${day}`,
          ),
        )
      ).data;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
