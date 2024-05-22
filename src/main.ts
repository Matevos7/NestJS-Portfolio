import { NestFactory } from '@nestjs/core';
import { Reflector } from '@nestjs/core/services';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ClassSerializerInterceptor } from '@nestjs/common/serializer';
import { HttpStatus, ValidationPipe, VersioningType } from '@nestjs/common';

import compression from 'compression';
import { initializeTransactionalContext } from 'typeorm-transactional';

import { AppModule } from './app.module';

import { ResponseManager } from '@common/helpers';
import { IValidationErrors } from '@common/models';
import { SanitizePipe } from '@common/pipes';

const PORT = process.env.PORT || 5000;

process.env.TZ = 'Etc/UTC';

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(compression());
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.enableCors();
  app.disable('x-powered-by');
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: false,
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      stopAtFirstError: true,
      exceptionFactory: (errors) => {
        const errorResponse: IValidationErrors[] = [];
        errors.forEach((e) => {
          if (e.constraints) {
            errorResponse.push(...ResponseManager.validationHandler([e]));
          }
          if (e.children) {
            errorResponse.push(
              ...ResponseManager.validationHandler(
                e.children,
                e.property?.toLowerCase(),
              ),
            );
          }
        });
        throw ResponseManager.buildError(
          { errors: errorResponse, message: 'ValidationError' },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      },
    }),
  );

  app.useGlobalPipes(new SanitizePipe());

  if (process.env.NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('Book Management APIs')
      .setDescription('The Book Management API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(PORT);
}
bootstrap();
