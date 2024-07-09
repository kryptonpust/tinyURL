import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvConfigModule } from './env-config/env-config.module';
import { DatabaseModule } from './database/database.module';
import { ZookeeperModule } from './zookeeper/zookeeper.module';

@Module({
  imports: [EnvConfigModule, DatabaseModule, ZookeeperModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
