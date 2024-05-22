import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Author } from '@common/database/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    TypeOrmModule.forFeature([Author]),
  ],
  controllers: [AuthorsController],
  providers: [AuthorsService]
})
export class AuthorsModule { }
