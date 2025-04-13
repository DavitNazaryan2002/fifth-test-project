import { CompanyResponse } from './company.dto';
import { ApiProperty } from '@nestjs/swagger';

export class AddCompanyResponse {
  @ApiProperty({ type: CompanyResponse })
  company: CompanyResponse;
}
