import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

export default (configService: ConfigService): TypeOrmModuleOptions =>
  ({
    type: configService.get<string>('database.type'),
    host: configService.get<string>('database.host'),
    port: configService.get<number>('database.port'),
    username: configService.get<string>('database.user'),
    password: configService.get<string>('database.password'),
    database: configService.get<string>('database.name'),
    entities: ['dist/**/*.entity.js'],
    synchronize: true,
  }) as DataSourceOptions;
