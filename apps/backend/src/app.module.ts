import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { EnvConfigModule } from './env-config/env-config.module';
import { ZookeeperModule } from './zookeeper/zookeeper.module';
import { ShortUIDService } from './tiny-uid/tiny-uid.service';
import { URLMappingEntity } from './database/entities/url-mapping.entity';
import { APP_PIPE } from '@nestjs/core';
import { JoiPipe } from 'nestjs-joi';

@Module({
  imports: [
    EnvConfigModule,
    DatabaseModule,
    ZookeeperModule,
    DatabaseModule.forFeature([URLMappingEntity]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ShortUIDService,
    {
      provide: APP_PIPE,
      useClass: JoiPipe,
    },
  ],
})
export class AppModule {}
