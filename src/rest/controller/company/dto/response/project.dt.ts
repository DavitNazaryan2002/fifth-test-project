import {
  ProjectPriority,
  ProjectStatus,
} from '../../../../../core/comany/repository/model/project.schema';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProjectResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiPropertyOptional()
  description?: string;
  @ApiProperty({ enum: ProjectStatus })
  status: ProjectStatus;
  @ApiProperty({ enum: ProjectPriority })
  priority?: ProjectPriority;
  @ApiPropertyOptional()
  tags?: string[];
}
