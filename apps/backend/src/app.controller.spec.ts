import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            createShortURL: jest.fn().mockResolvedValue({
              short_url: '1234567',
              long_url: 'http://localhost',
            }),
            getLongURLByShortUID: jest.fn().mockResolvedValue({
              short_url: '1234567',
              long_url: 'http://localhost',
            }),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('AppController', () => {
    it('should create a short URL', async () => {
      const shortURL = await appController.createTinyURL({
        long_url: 'http://localhost',
      });
      expect(shortURL).toEqual({
        short_url: '1234567',
        long_url: 'http://localhost',
      });
    });

    it('should return long URL from short UID', async () => {
      const longURL = await appController.getLongURLfromShortUID('1234567');
      expect(longURL).toEqual({
        short_url: '1234567',
        long_url: 'http://localhost',
      });
    });

    it('should redirect to long URL', async () => {
      const response = await appController.redirectToLongURL('1234567');
      expect(response.url).toBe('http://localhost');
    });
  });
});
