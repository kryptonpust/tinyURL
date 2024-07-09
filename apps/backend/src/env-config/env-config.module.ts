import { Global, Module } from '@nestjs/common';
import { TypedConfigModule, dotenvLoader } from 'nest-typed-config';
import { RootConfig } from './configs/root.config';
import { configValidator } from './utils/util';
import { CassandraConfig } from './configs/cassandra.config';

@Global()
@Module({
  imports: [
    TypedConfigModule.forRoot({
      schema: RootConfig,
      load: [dotenvLoader({ separator: '_' })],
      normalize(config) {
        CassandraConfig.registerHook(config);
        return config;
      },
      validate: configValidator,
    }),
  ],
})
export class EnvConfigModule {}
