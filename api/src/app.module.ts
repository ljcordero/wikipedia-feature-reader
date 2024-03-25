import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Configuration from './config/configuration';
import typeormFactory from './config/typeorm';

@Module({
  imports: [
    Configuration,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: typeormFactory,
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
