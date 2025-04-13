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
import { CompanyService } from './service/company.service';
import { CompanyRepository } from './repository/company.repository';
import { UserCompanyRepository } from './repository/user-company.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CompanyEntity.name, schema: CompanySchema },
      { name: UserCompanyEntity.name, schema: UserCompanySchema },
    ]),
    UserModule,
  ],
  providers: [CompanyService, CompanyRepository, UserCompanyRepository],
  exports: [CompanyService],
})
export class CompanyModule {}
