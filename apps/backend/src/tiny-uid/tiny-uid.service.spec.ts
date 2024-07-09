import { Test, TestingModule } from '@nestjs/testing';
import { ShortUIDService } from './tiny-uid.service';

describe('TinyUidService', () => {
  let service: ShortUIDService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShortUIDService],
    }).compile();

    service = module.get<ShortUIDService>(ShortUIDService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
