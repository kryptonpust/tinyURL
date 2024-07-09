import { Type } from 'class-transformer';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { AppConfig } from './app.config';
import { CassandraConfig } from './cassandra.config';
import { ZookeeperConfig } from './zookeeper.config';

@JoiSchemaOptions({
  allowUnknown: true, //otherwise os env creates error
  abortEarly: false, //to show all errors
  stripUnknown: true, //to remove unknown fields
})
export class RootConfig {
  @Type(() => AppConfig)
  @JoiSchema(AppConfig, (schema) => schema.required())
  public readonly app!: AppConfig;
  @Type(() => CassandraConfig)
  @JoiSchema(CassandraConfig, (schema) => schema.required())
  cassandra!: CassandraConfig;
  @Type(() => ZookeeperConfig)
  @JoiSchema(ZookeeperConfig, (schema) => schema.required())
  public readonly zookeeper!: ZookeeperConfig;
}
