import { ENV_CONST } from '@common/constants';
import { databaseConfiguration, jwtConfig, appConfig } from '@common/config';

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@resources/index';

import { AppService } from './app.service';

import { AppController } from './app.controller';

import validators from '@common/validators';

import { IpMiddleware } from '@common/middleware';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';

import { NodeEnv } from '@common/enums';
import { BooksModule,AuthorsModule } from './resources/';

const isProductionMode = process.env.NODE_ENV === NodeEnv.production;

const envFilePath = isProductionMode
  ? ENV_CONST.ENV_PATH_PROD
  : ENV_CONST.ENV_PATH_DEV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
      expandVariables: true,
      validationSchema: validators,
      load: [jwtConfig, appConfig, databaseConfiguration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get<string>(`DB_CONFIG.host`),
          port: configService.get<number>(`DB_CONFIG.port`),
          username: configService.get<string>(`DB_CONFIG.username`),
          password: configService.get<string>(`DB_CONFIG.password`),
          database: configService.get<string>(`DB_CONFIG.database`),
          autoLoadEntities: true,
          // entities: ['dist/**/*.entity{.ts,.js}'],
          // Do not use synchronize in production mode
          // https://docs.nestjs.com/techniques/database
          synchronize: configService.get<boolean>(`DB_CONFIG.sync`),
          entities: [], //
        };
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    AuthModule,
    BooksModule,
    AuthorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IpMiddleware).forRoutes('*');
  }
}
