import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, VersioningType } from '@nestjs/common';
import { setupSwagger } from './utils/swagger';

const PORT = process.env.PORT || 5000;
const GLOBAL_PREFIX = 'api';
const DEFAULT_VERSION = '1';
const SWAGGER_PATH = '/docs/api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: DEFAULT_VERSION,
  });
  setupSwagger({
    app,
    title: 'TinyURL API',
    description: 'The API description',
    version: '1.0',
    path: SWAGGER_PATH,
  });
  await app.listen(PORT);
  Logger.log(`Server is running on: ${await app.getUrl()}`);
  Logger.log(`Swagger is running on: ${await app.getUrl()}${SWAGGER_PATH}`);
}
bootstrap();
