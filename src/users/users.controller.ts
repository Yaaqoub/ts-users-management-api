import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query
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
  async findAll(@Query() filters) {
    this.logger.debug('Get All Users!');

    filters.page = Number(filters.page) ? Number(filters.page) : 0;
    filters.per_page = Number(filters.per_page) ? Number(filters.per_page) : 100;

    return this.usersService.findAll(filters);
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
    return this.usersService.archive(param.id, userDTO);
  }

  @Post('/bulkCreate')
  async createBulk(@Body() usersDTO: UserDTO[]): Promise<User[]> {
    this.logger.debug('Create Users In Bulk!');

    if (Array.isArray(usersDTO)) {
      return this.usersService.createBulk(usersDTO);
    } else {
      return null;
    }
  }

  @Post('/bulkDelete')
  async deleteBulk(@Body() ids: string[]) {
    this.logger.debug('Delete Users In Bulk!');

    if (Array.isArray(ids)) {
      return this.usersService.deleteBulk(ids);
    } else {
      return null;
    }
  }
}
