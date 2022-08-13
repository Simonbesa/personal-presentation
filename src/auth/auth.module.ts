import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedConfigService } from '../shared/shared-config.service';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule, ConfigModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService, SharedConfigService]
})
export class AuthModule {}
