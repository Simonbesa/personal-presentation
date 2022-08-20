import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpCredentialsDto, SignInCredentialsDto } from './dto/users.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('sign-up')
  async signUp(
    @Body() signUpCredentialsDto: SignUpCredentialsDto
  ): Promise<void> {
    return await this.authService.signUp(signUpCredentialsDto);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('sign-in')
  async signIn(@Body() signInCredentialsDto: SignInCredentialsDto) {
    return await this.authService.signIn(signInCredentialsDto);
  }
}
