import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from '../../../core/auth/service/auth.service';
import { SignUpDto } from './dto/request/sign-up.dto';
import { LogInRequest } from './dto/request/log-in.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthResponse } from './dto/response/auth.response';

@Controller('/auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(@Inject() private authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({
    summary: 'Sign Up',
  })
  @ApiResponse({
    type: AuthResponse,
  })
  async signup(@Body() body: SignUpDto): Promise<AuthResponse> {
    const { name, email, password } = body;
    const user = await this.authService.signUp(email, name, password);
    return { user };
  }

  @Post('/login')
  @ApiOperation({
    summary: 'Log In',
  })
  @ApiResponse({
    type: AuthResponse,
  })
  async login(@Body() body: LogInRequest): Promise<AuthResponse> {
    const { email, password } = body;
    const user = await this.authService.logIn(email, password);
    return { user };
  }
}
