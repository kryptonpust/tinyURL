import { Global, Module } from '@nestjs/common';
import { ZookeeperService } from './zookeeper.service';
@Global()
@Module({
  providers: [ZookeeperService],
  exports: [ZookeeperService],
})
export class ZookeeperModule {}
