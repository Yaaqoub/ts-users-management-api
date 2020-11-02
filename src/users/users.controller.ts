import {
  Controller,
  Get,
  Post,
  Body,
  Param
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from '../dto/user.dto';
import { User } from '../interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() userDTO: UserDTO): Promise<User> {
    return this.usersService.create(userDTO);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findById(@Param() param): Promise<User> {
    return this.usersService.findById(param.id);
  }
}
