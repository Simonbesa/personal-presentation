import { Test, TestingModule } from '@nestjs/testing';
import { UserDomain } from './user.domain';
import * as bcrypt from 'bcrypt';
import { UserDocument } from '../schemas/user.schema';

describe('UserDomain', () => {
  let service: UserDomain;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserDomain]
    }).compile();

    service = module.get<UserDomain>(UserDomain);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should user be sanitized', () => {
    const user = {
      email: 'prueba',
      password: 'prueba',
      depopulate: () => {
        return { email: 'prueba', password: undefined };
      }
    } as UserDocument;
    const sanitizedUser = service.fromUserDocumentWithoutPassword(user);
    expect(sanitizedUser.password).toBeUndefined();
  });

  it('should true to compare passwords', async () => {
    const inputPassword = 'clavecita';
    const dbPassword = await bcrypt.hash('clavecita', 10);
    const booleanCompare = await service.comparePasswords(inputPassword, dbPassword);
    expect(booleanCompare).toBeTruthy();
  });

  it('should false to compare wrong passwords', async () => {
    const inputPassword = 'clavecita malita';
    const dbPassword = await bcrypt.hash('clavecita', 10);
    const booleanCompare = await service.comparePasswords(inputPassword, dbPassword);
    expect(booleanCompare).toBeFalsy();
  });
});
