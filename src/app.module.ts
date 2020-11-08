import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerService } from './logger/logger.service';
import { LoggerModule } from './logger/logger.module';
import { FakeModule } from './fake/fake.module';
import configuration from './config/configuration';

@Module({
  imports: [
    UsersModule,

    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: `${configService.get('database.uri')}`,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
      }),
      inject: [ConfigService],
    }),

    LoggerModule,

    FakeModule,
  ],
  controllers: [],
  providers: [LoggerService],
})
export class AppModule {}
