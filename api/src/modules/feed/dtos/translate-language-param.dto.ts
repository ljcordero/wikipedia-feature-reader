import { IsNotEmpty, Validate } from 'class-validator';
import { LibreTranslateLanguageSupportedValidation } from '../validations/libre-translate-language-supported.validation';

export class TranslateLanguageParamDto {
  @IsNotEmpty()
  @Validate(LibreTranslateLanguageSupportedValidation)
  language: string;
}
