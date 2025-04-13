import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Permission, UserCompanyEntity } from './model/user-company.schema';

@Injectable()
export class UserCompanyRepository {
  constructor(
    @InjectModel(UserCompanyEntity.name)
    private userCompanyModel: Model<UserCompanyEntity>,
  ) {}

  public async addPermissionToUser(
    userId: string,
    companyId: string,
    permission: Permission,
  ): Promise<void> {
    await this.userCompanyModel.updateOne(
      {
        user_id: userId,
        company_id: companyId,
      },
      {
        $addToSet: {
          permissions: permission,
        },
      },
    );
  }

  public async revokePermission(
    userId: string,
    companyId: string,
    permission: Permission,
  ): Promise<void> {
    await this.userCompanyModel.updateOne(
      {
        user_id: userId,
        company_id: companyId,
      },
      {
        $pop: {
          permissions: permission,
        },
      },
    );
  }

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
