import { IsOptional, IsString, MinLength } from 'class-validator';

export class SignInCredentialsDto {
  @IsString()
  @MinLength(4)
  userId: string;

  @IsString()
  @MinLength(4)
  password: string;
}

export class SignUpCredentialsDto extends SignInCredentialsDto {
  @IsString()
  @IsOptional()
  name?: string;
}
