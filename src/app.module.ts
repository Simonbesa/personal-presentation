import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    UsersModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
