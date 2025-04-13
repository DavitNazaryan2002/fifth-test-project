import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserEntity } from './model/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserEntity.name) private userModel: Model<UserDocument>,
  ) {}

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ _id: id });
  }

  async createUser(
    email: string,
    name: string,
    password: string,
  ): Promise<UserDocument> {
    const existingUser = await this.findUserByEmail(email);
    if (existingUser != null) {
      throw new BadRequestException(`User with email: ${email} already exists`);
    }

    return this.userModel.insertOne({ email, name, password });
  }

  async findUserByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<UserDocument | null> {
    return this.userModel.findOne({ email, password });
  }

  private async findUserByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email });
  }
}
