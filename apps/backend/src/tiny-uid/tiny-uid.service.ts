import { ZookeeperService } from './../zookeeper/zookeeper.service';
import { Injectable } from '@nestjs/common';
import { AppConfig } from '../env-config/configs/app.config';

@Injectable()
export class ShortUIDService {
  private chars = '';
  private base = 0;
  private shortIDLength = 0;

  constructor(
    readonly appConfig: AppConfig,
    private readonly zookeeperService: ZookeeperService,
  ) {
    this.chars = appConfig.shortUIDChars;
    this.base = this.chars.length;
    this.shortIDLength = appConfig.shortUIDLength;
  }

  async generateUID(length: number = this.shortIDLength): Promise<string> {
    const index = await this.zookeeperService.getNextValue();
    return this.indexToBaseX(index, length);
  }

  private indexToBaseX(index: number, length: number): string {
    let result = '';

    while (index > 0) {
      result = this.chars[index % this.base] + result;
      index = Math.floor(index / this.base);
    }

    // If the result is shorter than the required length, pad it with the first character
    while (result.length < length) {
      result = this.chars[0] + result;
    }

    return result;
  }
}
