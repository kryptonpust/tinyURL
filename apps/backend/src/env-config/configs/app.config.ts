import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

export enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  LOCAL = 'local',
}

@JoiSchemaOptions({
  allowUnknown: false,
  abortEarly: true,
  stripUnknown: true,
})
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
