import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from '../../../core/auth/service/auth.service';
import { SignUpDto } from './dto/request/sign-up.dto';
import { UserResponse } from './dto/response/user.dto';
import { LogInRequest } from './dto/request/log-in.dto';

@Controller('/auth')
export class AuthController {
  constructor(@Inject() private authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() body: SignUpDto): Promise<{ user: UserResponse }> {
    const { name, email, password } = body;
    const user = await this.authService.signUp(email, name, password);
    return { user };
  }

  @Post('/login')
  async login(@Body() body: LogInRequest): Promise<{ user: UserResponse }> {
    const { email, password } = body;
    const user = await this.authService.logIn(email, password);
    return { user };
  }
}
