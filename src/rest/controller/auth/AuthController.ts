import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from '../../../core/auth/service/auth.service';
import { SignupRequestDto } from './dto/request/SignUpRequest.dto';
import { UserResponse } from './dto/response/UserResponse.dto';
import { LogInRequest } from './dto/request/LogInRequest.dto';

@Controller('/auth')
export class AuthController {
  constructor(@Inject() private authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() body: SignupRequestDto): Promise<UserResponse> {
    const { name, email, password } = body;
    const user = await this.authService.signUp(email, name, password);
    return UserResponse.fromUser(user);
  }

  @Post('/login')
  async login(@Body() body: LogInRequest): Promise<UserResponse> {
    const { email, password } = body;
    const user = await this.authService.logIn(email, password);
    return UserResponse.fromUser(user);
  }
}
