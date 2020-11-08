import {
  Controller,
  Body,
  Post
} from '@nestjs/common';
import { FakeService } from './fake.service';
import { LoggerService } from '../logger/logger.service';
import { User } from '../interfaces/user.interface';

@Controller('fake/users')
export class FakeController {

  constructor(
    private fakeService: FakeService,
    private logger: LoggerService
  ) {
    this.logger.setContext('FakeController');
  }

  @Post()
  async create(@Body() bodyData): Promise<User[]> {
    this.logger.debug('Create Fake Users!');

    const requiredBodyFields = ['usersNumber', 'emailDomains', 'archived', 'avatar'];

    if (requiredBodyFields.every(key => Object.keys(bodyData).includes(key)) && bodyData.usersNumber <= 100) {
      return this.fakeService.create(bodyData);
    } else {
      return null;
    }
  }
}
