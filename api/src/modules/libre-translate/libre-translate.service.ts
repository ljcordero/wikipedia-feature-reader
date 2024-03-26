import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import LibreTranslateSupportedLanguageDto from './dtos/libre-translate-supported-language.dto';

@Injectable()
export class LibreTranslateService {
  private readonly logger = new Logger(LibreTranslateService.name);

  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getSupportedLanguages(): Promise<LibreTranslateSupportedLanguageDto[]> {
    try {
      return (
        await firstValueFrom(
          this.httpService.get(
            `${this.configService.get<string>('libreTranslate.url')}/languages`,
          ),
        )
      ).data;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async translate(
    text: string,
    source: string,
    target: string,
  ): Promise<{ translatedText: string }> {
    try {
      return (
        await firstValueFrom(
          this.httpService.post(
            `${this.configService.get<string>('libreTranslate.url')}/translate`,
            {
              q: text,
              source: source || 'auto',
              target,
              format: 'text',
              api_key: this.configService.get<string>('libreTranslate.key'),
            },
            {
              headers: { 'Content-Type': 'application/json' },
            },
          ),
        )
      ).data;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
