import { ProjectResponse } from './project.dt';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CompanyResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiPropertyOptional()
  industry?: string;
  @ApiProperty({ isArray: true, type: ProjectResponse })
  projects: ProjectResponse[];
}
