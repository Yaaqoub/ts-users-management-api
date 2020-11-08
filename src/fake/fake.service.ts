import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { User } from '../schemas/user.schema';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class FakeService {

  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private logger: LoggerService
  ) {
    this.logger.setContext('FakeService');
  }
}
