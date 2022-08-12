import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthCredentialsDto } from './dto/users.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signUp(authCredentials: AuthCredentialsDto): Promise<void> {
    const { userId } = authCredentials;
    const existingUser = await this.usersService.findOneByUserId(userId);
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    await this.usersService.create(authCredentials);
    return;
  }
}
