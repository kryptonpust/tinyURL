import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import * as Joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';
import { URL_MAX_LENGTH } from '../utils/constants';

JoiSchemaOptions({
  allowUnknown: false,
  abortEarly: true,
  stripUnknown: true,
});
export class CreateTinyURLDto {
  @ApiProperty({
    description: 'Long URL that needs to be shortened',
    example: 'https://www.google.com',
    maxLength: URL_MAX_LENGTH,
  })
  @JoiSchema(Joi.string().uri().max(URL_MAX_LENGTH).required())
  long_url: string;
}
