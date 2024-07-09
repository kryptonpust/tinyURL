import { Test, TestingModule } from '@nestjs/testing';
import { ZookeeperService } from './zookeeper.service';
import { ZookeeperConfig } from '../env-config/configs/zookeeper.config';

describe('ZookeeperService', () => {
  let service: ZookeeperService;
  let spyIncrementCounterBy: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZookeeperService,
        {
          provide: ZookeeperConfig,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ZookeeperService>(ZookeeperService);
    jest.spyOn(service, 'onModuleInit').mockImplementation(() => {});
    jest.spyOn(service, 'onModuleDestroy').mockImplementation(() => {});
    spyIncrementCounterBy = jest
      .spyOn(service as any, 'incrementCounterBy')
      .mockResolvedValue({
        prev_val: 1,
        new_val: 5,
      });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get new pool chunk from Zookeeper', async () => {
    const result = await service.getNextValue();
    expect(result).toEqual(1);
    expect(spyIncrementCounterBy).toHaveBeenCalledTimes(1);
  });
});
