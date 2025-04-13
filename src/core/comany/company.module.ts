import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CompanyEntity,
  CompanySchema,
} from './repository/model/company.schema';
import {
  UserCompanyEntity,
  UserCompanySchema,
} from './repository/model/user-company.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CompanyEntity.name, schema: CompanySchema },
      { name: UserCompanyEntity.name, schema: UserCompanySchema },
    ]),
  ],
})
export class CompanyModule {}
