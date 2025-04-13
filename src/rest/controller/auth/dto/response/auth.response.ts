import { UserResponse } from './user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
  @ApiProperty()
  user: UserResponse;
}
