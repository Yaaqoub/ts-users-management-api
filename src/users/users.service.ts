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
    this.logger.debug(`Create User: ${user.username}`);
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    this.logger.debug('Get All Users!');
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<User> {
    this.logger.debug('Get One User!');
    return id.match(/^[0-9a-fA-F]{24}$/)
      ? await this.userModel.findOne({ _id: id })
      : null;
  }

  async update(id: string, user: UserDTO): Promise<User> {
    this.logger.debug('Update User!');
    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async delete(id: string): Promise<User> {
    this.logger.debug('Delete User!');
    return this.userModel.findByIdAndRemove(id);
  }
}
