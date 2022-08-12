import { IsOptional, IsString, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  userId: string;

  @IsString()
  @MinLength(4)
  password: string;

  @IsString()
  @IsOptional()
  name?: string;
}
