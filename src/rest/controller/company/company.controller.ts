import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CompanyService } from '../../../core/comany/service/company.service';
import { AddCompanyRequest } from './dto/request/add-company.dto';
import { CompanyResponse } from './dto/response/company.dto';

@Controller('/companies')
export class CompanyController {
  constructor(@Inject() private companyService: CompanyService) {}

  @Post('/')
  async addCompany(
    @Body() addCompanyDto: AddCompanyRequest,
  ): Promise<CompanyResponse> {
    const { name, industry } = addCompanyDto;
    return this.companyService.addCompany(name, industry);
  }
}
