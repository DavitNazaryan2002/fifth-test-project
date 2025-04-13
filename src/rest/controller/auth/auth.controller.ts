import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from '../../../core/auth/service/auth.service';
import { SignUpDto } from './dto/request/sign-up.dto';
import { UserResponse } from './dto/response/user.dto';
import { LogInRequest } from './dto/request/log-in.dto';

@Controller('/auth')
export class AuthController {
  constructor(@Inject() private authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() body: SignUpDto): Promise<UserResponse> {
    const { name, email, password } = body;
    return await this.authService.signUp(email, name, password);
  }

  @Post('/login')
  async login(@Body() body: LogInRequest): Promise<UserResponse> {
    const { email, password } = body;
    return this.authService.logIn(email, password);
  }
}
