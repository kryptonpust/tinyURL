import { plainToClass } from 'class-transformer';
import { getTypeSchema } from 'nestjs-joi';
import { RootConfig } from './configs/root.config';

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
