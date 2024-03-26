import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import Configuration from '../../../config/configuration';
import { LibreTranslateService } from '../libre-translate.service';
import translationMockedData from './mock/translation-mocked-data';

describe('WikipediaService', () => {
  let service: LibreTranslateService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, Configuration],
      providers: [LibreTranslateService],
    }).compile();

    service = app.get<LibreTranslateService>(LibreTranslateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getSupportedLanguages', async () => {
    const promise = service.getSupportedLanguages();

    expect(promise).toBeInstanceOf(Promise);

    return promise.then((supportedLanguages) => {
      expect(supportedLanguages).toBeDefined();

      for (const supportedLanguage of supportedLanguages) {
        expect(supportedLanguage.code).toBeDefined();
        expect(supportedLanguage.name).toBeDefined();
        expect(supportedLanguage.targets).toBeDefined();
      }
    });
  });

  test.each(translationMockedData)('translate', async (mockData) => {
    const promise = service.translate(mockData.en, 'en', 'es');

    expect(promise).toBeInstanceOf(Promise);

    return promise.then(({ translatedText }) => {
      expect(translatedText).toMatch(mockData.es);
    });
  });
});
