import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export type SwaggerOptions<T> = {
  app: INestApplication<T>;
  title?: string;
  description?: string;
  swaggerUsername?: string;
  swaggerPassword?: string;
  version?: string;
  path?: string;
};

export const setupSwagger = <T>({
  app,
  title = 'Swagger API',
  description = 'The API description',
  version = '1.0',
  path = '/docs/api',
}: SwaggerOptions<T>) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup(path, app, document, {
    swaggerOptions: {
      tryItOutEnabled: true,
    },
  });
};
