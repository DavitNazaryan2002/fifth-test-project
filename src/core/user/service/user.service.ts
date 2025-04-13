import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { User } from './model/User.model';

@Injectable()
export class UserService {
  constructor(@Inject() private userRepository: UserRepository) {}

  async findUserById(id: string) {
    const userDocument = await this.userRepository.findById(id);
    if (userDocument == null) {
      throw new NotFoundException('User not found');
    }

    return User.fromDocument(userDocument);
  }

  async createUser(
    email: string,
    name: string,
    password: string,
  ): Promise<User> {
    const userDocument = await this.userRepository.createUser(
      email,
      name,
      password,
    );
    return User.fromDocument(userDocument);
  }

  async findUserByEmail(email: string): Promise<User> {
    const userDocument = await this.userRepository.findUserByEmail(email);
    if (userDocument == null) {
      throw new NotFoundException('User not found');
    }
    return User.fromDocument(userDocument);
  }
}
