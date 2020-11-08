import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { User } from '../schemas/user.schema';
import { LoggerService } from '../logger/logger.service';
import { UserDTO } from '../dto/user.dto';
import * as faker from 'faker';
import * as _ from 'underscore';

@Injectable()
export class FakeService {

  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private logger: LoggerService
  ) {
    this.logger.setContext('FakeService');
  }

  async create(bodyData) {
    this.logger.debug(`Create Fake Users: ${bodyData.usersNumber}`);

    const usersDTO: UserDTO[] = [];

    for (let i = 0, len = bodyData.usersNumber; i < len; i++) {
      const username = faker.internet.userName();
      usersDTO.push({
        username: username,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: `${username}@${_.sample(bodyData.emailDomains)}`,
        phone: faker.phone.phoneNumberFormat(),
        city: faker.address.city(),
        country: faker.address.country(),
        address: faker.address.streetAddress(),
        zipCode: faker.address.zipCode(),
        gender: faker.name.gender(),
        avatar: bodyData.avatar === 'default' ? 'https://cdn0.iconfinder.com/data/icons/professional-avatar-5/48/manager_male_avatar_men_character_professions-512.png' : faker.image.avatar(),
        archived: bodyData.archived
      });
    }

    return this.userModel.insertMany(usersDTO);
  }
}
