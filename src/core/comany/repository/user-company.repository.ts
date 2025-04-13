import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserCompanyEntity } from './model/user-company.schema';

@Injectable()
export class UserCompanyRepository {
  constructor(
    @InjectModel(UserCompanyEntity.name)
    private userCompanyModel: Model<UserCompanyEntity>,
  ) {}

  public async findByUserAndCompany(
    userId: string,
    companyId: string,
  ): Promise<UserCompanyEntity | null> {
    return this.userCompanyModel.findOne({
      user_id: userId,
      company_id: companyId,
    });
  }
}
