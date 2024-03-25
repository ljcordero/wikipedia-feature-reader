import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService, API_INFORMATION_DATA } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  describe('root', () => {
    it('should return Basic app info', () => {
      expect(appController.getApiInformation()).toStrictEqual(
        API_INFORMATION_DATA,
      );
    });
  });
});
