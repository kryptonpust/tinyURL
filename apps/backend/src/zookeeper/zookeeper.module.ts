import { Module } from '@nestjs/common';
import { ZookeeperService } from './zookeeper.service';

@Module({
  providers: [ZookeeperService]
})
export class ZookeeperModule {}
