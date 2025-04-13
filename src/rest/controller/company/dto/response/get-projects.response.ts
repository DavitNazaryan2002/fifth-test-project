import { ProjectResponse } from './project.dt';
import { ApiProperty } from '@nestjs/swagger';

export class GetProjectsResponse {
  @ApiProperty({ type: ProjectResponse, isArray: true })
  projects: ProjectResponse[];
}
