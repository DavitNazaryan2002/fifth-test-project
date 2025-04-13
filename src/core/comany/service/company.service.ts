import {
  BadRequestException,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import { CompanyRepository } from '../repository/company.repository';
import { Permission } from '../repository/model/user-company.schema';
import { UserCompanyRepository } from '../repository/user-company.repository';
import { Company } from './model/company.model';

export class CompanyService {
  constructor(
    @Inject() private companyRepository: CompanyRepository,
    @Inject() private userCompanyRepository: UserCompanyRepository,
  ) {}

  public async addCompany(name: string, industry?: string): Promise<Company> {
    const existing = await this.companyRepository.findByName(name);
    if (existing) {
      throw new BadRequestException('Company name is taken');
    }

    return this.companyRepository.createCompany(name, industry);
  }

  private async validateCompanyPermission(
    userId: string,
    companyId: string,
    permission: Permission,
  ) {
    const userCompanyEntity =
      await this.userCompanyRepository.findByUserAndCompany(userId, companyId);
    if (
      userCompanyEntity == null ||
      !userCompanyEntity.permissions.includes(permission)
    ) {
      throw new ForbiddenException(
        `User: ${userId} does not have permission ${permission} at the company: ${companyId}`,
      );
    }
  }
}
