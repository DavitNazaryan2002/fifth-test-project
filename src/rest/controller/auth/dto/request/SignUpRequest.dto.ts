import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class SignupRequestDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
