import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

@JoiSchemaOptions({
  allowUnknown: false,
  abortEarly: true,
  stripUnknown: true,
})
export class ZookeeperConfig {
  @JoiSchema(Joi.string().required())
  public readonly connectionStrings!: string;
  @JoiSchema(Joi.number().required())
  public readonly poolChunkSize!: number;
  @JoiSchema(Joi.string().required())
  public readonly counterPath!: string;
}
