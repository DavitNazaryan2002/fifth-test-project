import { IsEmail, IsStrongPassword } from 'class-validator';

export class LogInRequest {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
