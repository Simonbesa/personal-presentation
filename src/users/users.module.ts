import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDomain } from './domain/user.domain';
import { User, UserSchema } from './schemas/users.schema';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema, collection: 'users' }
    ])
  ],
  providers: [UsersService, UsersRepository, UserDomain],
  controllers: [UsersController],
  exports: [UsersService, UsersRepository, UserDomain]
})
export class UsersModule {}
