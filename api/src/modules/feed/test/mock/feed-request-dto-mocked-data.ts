import { FeedRequestDto } from '../../dtos/feed-request.dto';
import { WikipediaSupportedLanguage } from '../../../wikipedia/wikipedia-supported-language';
import { yesterday } from '../../../../utils/date';

export const getFeedRequestDtoMockedData = (): FeedRequestDto[] => {
  const date = yesterday();

  return [
    WikipediaSupportedLanguage.English,
    WikipediaSupportedLanguage.Japanese,
    WikipediaSupportedLanguage.Bengali,
  ].map((wikipediaSupportedLanguage) => {
    return {
      date,
      language: wikipediaSupportedLanguage,
    };
  });
};
