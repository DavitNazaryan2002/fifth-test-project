import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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
    const userDocument = await this.userRepository.createUser(
      email,
      name,
      password,
    );
    return {
      id: userDocument._id.toString(),
      ...userDocument,
    };
  }

  async findUserByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<User> {
    const userDocument = await this.userRepository.findUserByEmailAndPassword(
      email,
      password,
    );
    if (userDocument == null) {
      throw new NotFoundException('User not found');
    }
    return {
      id: userDocument._id.toString(),
      ...userDocument,
    };
  }
}
