import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from '../dto/user.dto';
import { User } from '../interfaces/user.interface';
import { LoggerService } from 'src/logger/logger.service';

@Controller('users')
export class UsersController {

  constructor(
    private usersService: UsersService,
    private logger: LoggerService
  ) {
    this.logger.setContext('UsersController');
  }

  @Post()
  async create(@Body() userDTO: UserDTO): Promise<User> {
    this.logger.debug('Create User!');
    return this.usersService.create(userDTO);
  }

  @Get()
  async findAll(): Promise<User[]> {
    this.logger.debug('Get All Users!');
    return this.usersService.findAll();
  }

  @Get(':id')
  async findById(@Param() param): Promise<User> {
    this.logger.debug('Get One User!');
    return this.usersService.findById(param.id);
  }

  @Put(':id')
  async update(@Param() param, @Body() userDTO: UserDTO): Promise<User> {
    this.logger.debug('Update User!');
    return this.usersService.update(param.id, userDTO);
  }

  @Delete(':id')
  async delete(@Param() param): Promise<User> {
    this.logger.debug('Delete User!');
    return this.usersService.delete(param.id);
  }

  @Put(':id/archive')
  async archive(@Param() param, @Body() userDTO: UserDTO): Promise<User> {
    this.logger.debug('Archive User!');
    let userData = {};

    if (userDTO.hasOwnProperty('archived')) {
      userData = {
        archived: userDTO.archived
      }
    }

    return this.usersService.archive(param.id, userData);
  }
}
