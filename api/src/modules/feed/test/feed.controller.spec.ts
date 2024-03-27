import { Test, TestingModule } from '@nestjs/testing';
import { FeedController } from '../feed.controller';
import { FeedService } from '../feed.service';
import { WikipediaModule } from '../../wikipedia/wikipedia.module';
import { LibreTranslateModule } from '../../libre-translate/libre-translate.module';
import Configuration from '../../../config/configuration';
import { HttpModule } from '@nestjs/axios';
import { getFeedRequestDtoMockedData } from './mock/feed-request-dto-mocked-data';
import { getFeedRequestTranslateLanguageMockedData } from './mock/feed-request-translate-language-mocked-data';
import { FeedResponseDto } from '../dtos/feed-response.dto';

describe('FeedController', () => {
  let controller: FeedController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        WikipediaModule,
        LibreTranslateModule,
        HttpModule,
        Configuration,
      ],
      controllers: [FeedController],
      providers: [FeedService],
    }).compile();

    controller = app.get<FeedController>(FeedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  const feedRequestTestValidator = (feed: FeedResponseDto | null) => {
    expect(feed).toBeDefined();
    expect(feed?.title).toBeDefined();
    expect(feed?.description).toBeDefined();
    expect(feed?.url).toBeDefined();
    expect(feed?.extract).toBeDefined();
    expect(feed?.lastEditedDate).toBeDefined();
  };

  test.each(getFeedRequestDtoMockedData())(
    'should return a wikipedia feature content',
    async (mockData) => {
      const promise = controller.get(mockData);

      expect(promise).toBeInstanceOf(Promise);

      return promise.then((feed) => {
        feedRequestTestValidator(feed);
      });
    },
  );

  test.each(getFeedRequestTranslateLanguageMockedData())(
    'should return a wikipedia feature content translated',
    async (mockData) => {
      const promise = controller.getTranslated(
        { ...mockData },
        { language: mockData.translateLanguage },
      );

      expect(promise).toBeInstanceOf(Promise);

      return promise.then((feed) => {
        feedRequestTestValidator(feed);
      });
    },
  );
});
