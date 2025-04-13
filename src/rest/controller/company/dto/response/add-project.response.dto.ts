import { ProjectResponse } from './project.dt';
import { ApiProperty } from '@nestjs/swagger';

export class AddProjectResponse {
  @ApiProperty({ type: ProjectResponse })
  project: ProjectResponse;
}
