import { Type, plainToClass } from 'class-transformer';
import { JoiSchema, JoiSchemaOptions, getTypeSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  LOCAL = 'local',
}

export class AppConfig {
  @JoiSchema(
    Joi.string()
      .valid(...Object.values(Environment))
      .required(),
  )
  public readonly env!: string;
  @JoiSchema(Joi.string().uri().required())
  public readonly url!: string;
}

export class CassandraConfig {
  host!: string;
  port!: number;
  username!: string;
  password!: string;
  database!: string;
}

export class ZookeeperConfig {
  @JoiSchema(Joi.string().required())
  public readonly host!: string;
  @JoiSchema(Joi.number().required())
  public readonly port!: number;
}

@JoiSchemaOptions({
  allowUnknown: true, //otherwise os env creates error
  abortEarly: false, //to show all errors
  stripUnknown: true, //to remove unknown fields
})
export class RootConfig {
  @Type(() => AppConfig)
  @JoiSchema(AppConfig, (schema) => schema.required())
  public readonly app!: AppConfig;
  // @Type(() => CassandraConfig)
  // cassandra!: CassandraConfig;
  @Type(() => ZookeeperConfig)
  @JoiSchema(ZookeeperConfig, (schema) => schema.required())
  public readonly zookeeper!: ZookeeperConfig;
}

export const configValidator = (rawConfig: unknown) => {
  const config = plainToClass(RootConfig, rawConfig);
  const { error, value } = getTypeSchema(RootConfig).validate(config);
  if (error) {
    const reasons = error.details
      .map((detail: { message: string }) => detail.message)
      .join(', ');
    throw new Error(reasons);
  }
  return value as RootConfig;
};
