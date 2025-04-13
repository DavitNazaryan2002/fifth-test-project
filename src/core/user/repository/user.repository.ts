import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserEntity } from './model/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(UserEntity.name) private userModel: Model<UserEntity>) {}

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    return this.userModel.findOne({ email });
  }

  async createUser(
    email: string,
    name: string,
    password: string,
  ): Promise<UserEntity> {
    return this.userModel.insertOne({ email, name, password });
  }

  async findUserByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    return this.userModel.findOne({ email, password });
  }
}
