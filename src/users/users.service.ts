import { Injectable } from '@nestjs/common';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDTO } from '../dto/user.dto';

@Injectable()
export class UsersService {

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(user: UserDTO) {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
