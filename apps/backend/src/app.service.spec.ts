import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { ShortUIDService } from './tiny-uid/tiny-uid.service';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [
        AppService,
        {
          provide: ShortUIDService,
          useValue: {
            generateUID: jest.fn().mockResolvedValue('aaaaab'),
          },
        },
        {
          provide: 'URLMappingEntityRepository',
          useValue: {
            create: jest.fn().mockResolvedValue({
              short_url: 'aaaaab',
              long_url: 'http://localhost',
            }),
            findOneOrFail: jest.fn().mockResolvedValue({
              short_url: 'aaaaab',
              long_url: 'http://localhost',
            }),
          },
        },
      ],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  describe('AppService', () => {
    it('should be defined', () => {
      expect(appService).toBeDefined();
    });

    it('should create a short URL', async () => {
      const shortURL = await appService.createShortURL({
        long_url: 'http://localhost',
      });
      expect(shortURL).toEqual({
        short_url: 'aaaaab',
        long_url: 'http://localhost',
      });
    });

    it('should return long URL from short UID', async () => {
      const longURL = await appService.getLongURLByShortUID('aaaaab');
      expect(longURL).toEqual({
        short_url: 'aaaaab',
        long_url: 'http://localhost',
      });
    });
  });
});
