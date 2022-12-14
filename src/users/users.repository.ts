import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/users.schema';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}
  public async create(user: User): Promise<UserDocument> {
    return this.userModel.create(user);
  }
  public async findOneByUserId(userId) {
    return this.userModel.findOne({ userId });
  }
}
