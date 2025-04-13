import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
