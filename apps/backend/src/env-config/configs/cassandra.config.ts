import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

export enum CassandraReplicationStrategy {
  SimpleStrategy,
  NetworkTopologyStrategy,
}

export enum CassandraMigrationStrategy {
  safe,
  alter,
  drop,
}

@JoiSchemaOptions({
  allowUnknown: false,
  abortEarly: true,
  stripUnknown: true,
})
export class CassandraConfig {
  @JoiSchema(Joi.array().items(Joi.string()).required())
  public readonly contactPoints: string[];
  @JoiSchema(Joi.string().required())
  public readonly keyspace: string;
  @JoiSchema(Joi.string().required())
  public readonly username: string;
  @JoiSchema(Joi.string().required())
  public readonly password: string;
  @JoiSchema(Joi.string().required())
  public readonly localDataCenter: string;
  @JoiSchema(Joi.number().required())
  public readonly replicationFactor: number;
  @JoiSchema(
    Joi.string()
      .valid(...Object.keys(CassandraReplicationStrategy))
      .required(),
  )
  public readonly replicationStrategy: keyof typeof CassandraReplicationStrategy;
  @JoiSchema(
    Joi.string()
      .valid(...Object.keys(CassandraMigrationStrategy))
      .required(),
  )
  public readonly migrationStrategy: keyof typeof CassandraMigrationStrategy;

  static registerHook(config: Record<string, any>) {
    // Convert comma-separated string to array
    if (
      config.hasOwnProperty('cassandra') &&
      config.cassandra.hasOwnProperty('contactPoints')
    ) {
      config.cassandra.contactPoints =
        config.cassandra.contactPoints.split(',');
    }
  }
}
