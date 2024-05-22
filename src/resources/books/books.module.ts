import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author, Book } from '@common/database/entities';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>(`JWT_CONFIG.secret`),
        signOptions: {
          expiresIn: configService.get<string>(`JWT_CONFIG.expiresIn`),
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Author, Book]),
  ],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule { }
