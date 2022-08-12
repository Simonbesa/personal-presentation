import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async create(userToCreate) {
    return this.usersRepository.create(userToCreate);
  }
  public async findOneByUserId(userId) {
    return this.usersRepository.findOneByUserId(userId);
  }
}
