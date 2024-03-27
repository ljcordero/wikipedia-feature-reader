import { Injectable, Logger } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DEFAULT_WIKIPEDIA_LANGUAGE } from '../constants';
import { LibreTranslateService } from '../../libre-translate/libre-translate.service';

@ValidatorConstraint({
  name: 'LibreTranslateLanguageSupportedValidation',
  async: true,
})
@Injectable()
export class LibreTranslateLanguageSupportedValidation
  implements ValidatorConstraintInterface
{
  private readonly logger = new Logger(
    LibreTranslateLanguageSupportedValidation.name,
  );

  constructor(private libreTranslateService: LibreTranslateService) {}

  async validate(language: string) {
    try {
      const supportedLanguages =
        await this.libreTranslateService.getSupportedLanguages();

      return supportedLanguages.some(
        (supportedLanguage) =>
          supportedLanguage.code === DEFAULT_WIKIPEDIA_LANGUAGE &&
          supportedLanguage.targets.includes(language),
      );
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  defaultMessage() {
    return `language not supported by the translation service`;
  }
}
