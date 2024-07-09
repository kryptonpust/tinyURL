import {
  EntityNotFound,
  InjectRepository,
  Repository,
} from '@dev101_cloud/nestjs-cassandra-module';
import { Injectable, NotFoundException } from '@nestjs/common';
import { URLMappingEntity } from './database/entities/url-mapping.entity';
import { CreateTinyURLDto } from './dto/create-tiny-url.dto';
import { ShortUIDService } from './tiny-uid/tiny-uid.service';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(URLMappingEntity)
    private readonly urlMappingModel: Repository<URLMappingEntity>,
    private readonly shortUIDService: ShortUIDService,
  ) {}

  async createShortURL(createTinyURLDto: CreateTinyURLDto) {
    // const res = await this.zookeeperService.incrementCounter();
    return this.urlMappingModel.create({
      short_url: await this.shortUIDService.generateUID(),
      long_url: createTinyURLDto.long_url,
    });
  }

  async getLongURLByShortUID(shortUID: string) {
    try {
      const result = await this.urlMappingModel.findOneOrFail({
        short_url: shortUID,
      });
      return result;
    } catch (e) {
      if (e instanceof EntityNotFound) {
        throw new NotFoundException('Short URL not found');
      }
    }
  }
}
