import {
  Controller,
  Body,
  Post
} from '@nestjs/common';
import { FakeService } from './fake.service';
import { LoggerService } from '../logger/logger.service';
import { UserDTO } from '../dto/user.dto';
import { User } from '../interfaces/user.interface';

@Controller('fake')
export class FakeController {

  constructor(
    private fakeService: FakeService,
    private logger: LoggerService
  ) {
    this.logger.setContext('FakeController');
  }


}
