import { Inject } from '@nestjs/common';
import { UserService } from '../../user/service/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from '../../user/service/model/User.model';

export class AuthService {
  constructor(@Inject() private userService: UserService) {}

  async signUp(email: string, name: string, password: string): Promise<User> {
    const hashedPassword = await this.hashPassword(password);
    return this.userService.createUser(email, name, hashedPassword);
  }

  async logIn(email: string, password: string): Promise<User> {
    const hashedPassword = await this.hashPassword(password);
    return this.userService.findUserByEmailAndPassword(email, hashedPassword);
  }

  private hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // You can adjust this for more security
    return bcrypt.hash(password, saltRounds);
  }
}
