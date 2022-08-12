import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Schema } from 'mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Player', schema: new Schema(), collection: 'users' },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
