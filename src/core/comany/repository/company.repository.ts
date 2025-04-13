import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserEntity } from '../../user/repository/model/user.schema';
import { Model } from 'mongoose';
import { CompanyEntity } from './model/company.schema';

@Injectable()
export class CompanyRepository {
  constructor(
    @InjectModel(UserEntity.name) private companyModel: Model<CompanyEntity>,
  ) {}

  public async findByName(name: string): Promise<CompanyEntity | null> {
    return this.companyModel.findOne({ name });
  }

  public async createCompany(name: string, industry?: string): Promise<CompanyEntity> {
    return await this.companyModel.insertOne({ name, industry, projects: [] });
  }
}
