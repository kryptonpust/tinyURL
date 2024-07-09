import { Test, TestingModule } from '@nestjs/testing';
import { ShortUIDService } from './tiny-uid.service';
import { AppConfig } from '../env-config/configs/app.config';
import { ZookeeperService } from '../zookeeper/zookeeper.service';

describe('TinyUidService', () => {
  let service: ShortUIDService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShortUIDService,
        {
          provide: AppConfig,
          useValue: {
            shortUIDLength: 6,
            shortUIDChars:
              'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
          },
        },
        {
          provide: ZookeeperService,
          useValue: {
            getNextValue: jest.fn().mockResolvedValue(1),
          },
        },
      ],
    }).compile();

    service = module.get<ShortUIDService>(ShortUIDService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate a short UID', async () => {
    const uid = await service.generateUID();
    expect(uid).toEqual('aaaaab');
  });
});
