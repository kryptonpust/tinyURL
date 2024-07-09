import { Module } from '@nestjs/common';
import { TypedConfigModule, dotenvLoader } from 'nest-typed-config';
import { RootConfig, configValidator } from './env-config';

@Module({
  imports: [
    TypedConfigModule.forRoot({
      isGlobal: true,
      schema: RootConfig,
      load: [dotenvLoader({ separator: '_' })],
      normalize(config) {
        return config;
      },
      validate: configValidator,
    }),
  ],
})
export class EnvConfigModule {}
