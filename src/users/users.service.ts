import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignInCredentialsDto } from 'src/auth/dto/users.dto';
import { UserDomain } from './domain/user.domain';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly userDomain: UserDomain
  ) {}

  public async create(userToCreate) {
    return this.usersRepository.create(userToCreate);
  }
  public async findOneByUserId(userId) {
    return this.usersRepository.findOneByUserId(userId);
  }
  public async checkCredentials(
    credentials: SignInCredentialsDto
  ): Promise<{ userId: string; isCheckedOk: boolean }> {
    const { userId, password } = credentials;
    const user = await this.findOneByUserId(userId);
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const isSamePassword = await this.userDomain.comparePasswords(
      password,
      user.password
    );
    if (!isSamePassword) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return { userId, isCheckedOk: true };
  }
}
