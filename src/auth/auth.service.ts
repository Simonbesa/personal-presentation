import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInCredentialsDto, SignUpCredentialsDto } from './dto/users.dto';
import * as bcrypt from 'bcrypt';
import { decode, sign, JwtPayload, verify } from 'jsonwebtoken';
import { JwtSecretKey } from './vo/jwt-secret-key.vo';
import { SignInResponse } from './dto/signin.dto';
import { SharedConfigService } from '../shared/shared-config.service';
import { UserDomain } from 'src/users/domain/user.domain';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: SharedConfigService
  ) {}

  private readonly b64JwtSecretKey =
    this.configService.get<string>('JWT_SECRET_KEY');

  private async signPayload(payload: any): Promise<string> {
    const secretKey = new JwtSecretKey(this.b64JwtSecretKey);
    return sign(payload, secretKey.toAscii(), {
      expiresIn: '7d',
      algorithm: 'HS512',
      keyid: '1'
    });
  }

  public async signUp(credentials: SignUpCredentialsDto): Promise<void> {
    const { userId, password } = credentials;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    credentials.password = hashedPassword;
    const existingUser = await this.usersService.findOneByUserId(userId);
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    await this.usersService.create(credentials);
    return;
  }

  public async signIn(
    credentials: SignInCredentialsDto
  ): Promise<SignInResponse> {
    const { userId, isCheckedOk } = await this.usersService.checkCredentials(
      credentials
    );
    if (isCheckedOk) {
      const accessToken = await this.signPayload({ userId });
      const decodedAccessToken = decode(accessToken);
      return new SignInResponse(
        accessToken,
        decodedAccessToken['exp'],
        'bearer'
      );
    }
    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  }

  public async verifyToken(token: string): Promise<UserDomain> {
    const secretKey = new JwtSecretKey(this.b64JwtSecretKey);
    try {
      const payload: JwtPayload | string = verify(token, secretKey.toAscii());
      const userDocument = await this.usersService.findOneByUserId(
        payload['userId']
      );
      const userDomain = new UserDomain();
      return userDomain.fromUserDocumentWithoutPassword(userDocument);
    } catch (error) {
      throw new HttpException(
        'User is not authorized',
        HttpStatus.UNAUTHORIZED
      );
    }
  }
}
