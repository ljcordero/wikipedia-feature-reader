import { WikipediaSupportedLanguage } from '../../../wikipedia/wikipedia-supported-language';
import { yesterday } from '../../../../utils/date';

export const getFeedRequestTranslateLanguageMockedData = (): {
  date: Date;
  language: WikipediaSupportedLanguage;
  translateLanguage: string;
}[] => {
  const date = yesterday();

  return ['es', 'fr'].map((language) => {
    return {
      date,
      language: WikipediaSupportedLanguage.English,
      translateLanguage: language,
    };
  });
};
