import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { User } from './model/User.model';

@Injectable()
export class UserService {
  constructor(@Inject() private userRepository: UserRepository) {}

  async createUser(
    email: string,
    name: string,
    password: string,
  ): Promise<User> {
    const existingUser = await this.findUserByEmail(email);
    if (existingUser != null) {
      throw new BadRequestException(`User with email: ${email} already exists`);
    }

    return this.userRepository.createUser(email, name, password);
  }

  async findUserByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<User> {
    const userEntity = await this.userRepository.findUserByEmailAndPassword(
      email,
      password,
    );
    if (userEntity == null) {
      throw new NotFoundException('User not found');
    }
    return userEntity;
  }

  private async findUserByEmail(email: string): Promise<User | null> {
    const userEntity = await this.userRepository.findUserByEmail(email);
    if (userEntity == null) {
      return null;
    }
    return userEntity;
  }
}
