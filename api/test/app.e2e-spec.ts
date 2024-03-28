import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { API_INFORMATION_DATA } from '../src/app.service';
import { getFeedRequestDtoMockedData } from '../src/modules/feed/test/mock/feed-request-dto-mocked-data';
import { FeedResponseDto } from '../src/modules/feed/dtos/feed-response.dto';
import { getFeedRequestTranslateLanguageMockedData } from '../src/modules/feed/test/mock/feed-request-translate-language-mocked-data';

describe('e2e', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET 404)', () => {
    return request(app.getHttpServer()).get('/404').expect(404).expect({
      message: 'Cannot GET /404',
      error: 'Not Found',
      statusCode: 404,
    });
  });

  it('/ (GET 200)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect(API_INFORMATION_DATA);
  });

  const feedRequestTestValidator = (url: string) => {
    return request(app.getHttpServer())
      .get(url)
      .expect(200)
      .expect((res) => {
        const feed = res.body as FeedResponseDto;
        expect(feed.id).toBeDefined();
        expect(feed.id).not.toBeNaN();
        expect(feed.title).toBeDefined();
        expect(feed.type).toBeDefined();
        expect(feed.description).toBeDefined();
        expect(feed.extract).toBeDefined();
        expect(feed.url).toBeDefined();
        expect(feed.lastEditedDate).toBeDefined();
        expect(new Date(feed.lastEditedDate).getTime()).not.toBeNaN();
      });
  };

  test.each(getFeedRequestDtoMockedData())('/feed (GET 200)', (mockData) => {
    const url = `/feed?date=${mockData.date.toISOString().split('T')[0]}&language=${mockData.language}`;
    return feedRequestTestValidator(url);
  });

  test.each(getFeedRequestTranslateLanguageMockedData())(
    '/feed/translate/#language (GET 200)',
    (mockData) => {
      const url = `/feed/translate/${mockData.translateLanguage}?date=${mockData.date.toISOString().split('T')[0]}`;
      return feedRequestTestValidator(url);
    },
  );
});
