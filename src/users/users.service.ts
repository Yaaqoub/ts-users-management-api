import { Injectable } from '@nestjs/common';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDTO } from '../dto/user.dto';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private logger: LoggerService
  ) {
    this.logger.setContext('UsersService');
  }

  async create(user: UserDTO) {
    this.logger.debug(`Create User!`);

    delete user.archived;

    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async findAll(filters) {
    this.logger.debug('Get All Users!');
    const users = await this.userModel.find().skip(filters.page * filters.per_page).limit(filters.per_page).exec();
    const usersTotal = await this.userModel.countDocuments();

    return {
      users: users,
      page: filters.page,
      pageSize: filters.per_page,
      total: usersTotal
    }
  }

  async findById(id: string): Promise<User> {
    this.logger.debug('Get One User!');
    return id.match(/^[0-9a-fA-F]{24}$/)
      ? await this.userModel.findOne({ _id: id })
      : null;
  }

  async update(id: string, user: UserDTO): Promise<User> {
    this.logger.debug('Update User!');

    delete user.archived;
    delete user.email;

    return this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async delete(id: string): Promise<User> {
    this.logger.debug('Delete User!');
    return this.userModel.findByIdAndRemove(id);
  }

  async archive(id: string, user: UserDTO): Promise<User> {
    this.logger.debug('Archive User!');

    let userData = {};

    if (user.hasOwnProperty('archived')) {
      userData = {
        archived: user.archived
      }
    }

    return this.userModel.findByIdAndUpdate(id, userData, { new: true });
  }

  async createBulk(users: UserDTO[]) {
    this.logger.debug(`Create Users: ${users.length}`);

    const requiredUserFields = ['username', 'firstName', 'lastName', 'email', 'gender'];
    const _users = [];

    if (users.length <= 100) {

      for (let i = 0; i < users.length; i++) {
        const _user = users[i];

        if (requiredUserFields.every(key => Object.keys(_user).includes(key))) {
          delete _user.archived;
          _users.push(_user);
        }
      }

      return this.userModel.insertMany(_users);
    } else {
      return null;
    }
  }

  async deleteBulk(ids: string[]) {
    this.logger.debug(`Delete Users: ${ids.length}`);

    if (ids.length <= 100) {
      return this.userModel.deleteMany(
        {
          _id: {
            $in: ids
          }
        }
      );
    } else {
      return null;
    }
  }
}
