import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MaxDate,
} from 'class-validator';
import { WikipediaSupportedLanguage } from '../../wikipedia/wikipedia-supported-language';
import { yesterday } from '../../../utils/date';

export class FeedRequestDto {
  @IsEnum(WikipediaSupportedLanguage)
  @IsOptional()
  language: WikipediaSupportedLanguage;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MaxDate(yesterday())
  date: Date;
}
