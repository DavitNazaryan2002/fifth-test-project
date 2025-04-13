import { Inject, Injectable } from '@nestjs/common';
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
      throw new Error('User exists');
    }

    return User.fromUserEntity(
      await this.userRepository.createUser(email, name, password),
    );
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
      throw new Error('User not found');
    }
    return User.fromUserEntity(userEntity);
  }

  private async findUserByEmail(email: string): Promise<User | null> {
    const userEntity = await this.userRepository.findUserByEmail(email);
    if (userEntity == null) {
      return null;
    }
    return User.fromUserEntity(userEntity);
  }
}
