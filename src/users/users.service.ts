import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {

  getUsers() {
    return [
      {
        name: 'user 001'
      },
      {
        name: 'user 002'
      },
      {
        name: 'user 003'
      },
      {
        name: 'user 004'
      }
    ]
  }
}
