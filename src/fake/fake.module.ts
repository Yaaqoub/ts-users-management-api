import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema';
import { LoggerModule } from '../logger/logger.module';
import { FakeController } from './fake.controller';
import { FakeService } from './fake.service';
import { LoggerService } from '../logger/logger.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    LoggerModule
  ],
  controllers: [FakeController],
  providers: [FakeService, LoggerService],
})
export class FakeModule {}
