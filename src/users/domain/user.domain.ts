import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserDocument } from '../schemas/users.schema';

@Injectable()
export class UserDomain {
  userId: string;
  password: string;
  name: string;

  public fromUserDocumentWithoutPassword(
    userDocument: UserDocument
  ): UserDomain {
    const user = new UserDomain();
    user.userId = userDocument._id;
    user.name = userDocument.name;
    delete user.password;
    return user;
  }

  public async comparePasswords(
    inputPassword: string,
    dbPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(inputPassword, dbPassword);
  }
}
