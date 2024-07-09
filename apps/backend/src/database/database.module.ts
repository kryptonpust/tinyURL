import {
  CassyllandraFeaturesModuleOptions,
  CassyllandraModule,
} from '@dev101_cloud/nestjs-cassandra-module';
import { Module } from '@nestjs/common';
import { CassandraConfig } from 'src/env-config/configs/cassandra.config';

export type DatabaseFeatureModuleOptions = CassyllandraFeaturesModuleOptions;

@Module({
  imports: [
    CassyllandraModule.forRootAsync({
      imports: [CassandraConfig],
      isGlobal: true,
      useFactory: (config: CassandraConfig) => {
        return {
          clientOptions: {
            contactPoints: config.contactPoints,
            localDataCenter: config.localDataCenter,
            keyspace: config.keyspace,
            credentials: {
              username: config.username,
              password: config.password,
            },
          },
          ormOptions: {
            defaultReplicationStrategy: {
              class: config.replicationStrategy,
              replication_factor: config.replicationFactor,
            },
            migration: config.migrationStrategy,
          },
        };
      },
      inject: [CassandraConfig],
    }),
  ],
})
export class DatabaseModule {
  static forFeature(options: DatabaseFeatureModuleOptions) {
    return CassyllandraModule.forFeature(options);
  }
}
