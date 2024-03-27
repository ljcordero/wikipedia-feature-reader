import { Test, TestingModule } from '@nestjs/testing';
import { WikipediaService } from '../wikipedia.service';
import { getYearMonthDay, yesterday } from '../../../utils/date';
import { WikipediaSupportedLanguage } from '../wikipedia-supported-language';
import { HttpModule } from '@nestjs/axios';
import Configuration from '../../../config/configuration';

describe('WikipediaService', () => {
  let service: WikipediaService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, Configuration],
      providers: [WikipediaService],
    }).compile();

    service = app.get<WikipediaService>(WikipediaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getFeaturedContent', async () => {
    const { year, month, day } = getYearMonthDay(yesterday());

    const promise = service.getFeaturedContent(
      WikipediaSupportedLanguage.English,
      year,
      month,
      day,
    );

    expect(promise).toBeInstanceOf(Promise);

    return promise.then((featuredContent) => {
      expect(featuredContent).toBeDefined();
      expect(featuredContent.tfa?.titles?.normalized).toBeDefined();
    });
  });
});
