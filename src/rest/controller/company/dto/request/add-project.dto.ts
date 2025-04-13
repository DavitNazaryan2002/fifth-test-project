import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProjectPriority, ProjectStatus } from '../../../../../core/comany/repository/model/project.schema';

export class AddProjectRequest {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(ProjectStatus, {
    message: `status must be one of: ${Object.values(ProjectStatus).join(', ')}`,
  })
  status: ProjectStatus;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(ProjectPriority, {
    message: `priority must be one of: ${Object.values(ProjectPriority).join(', ')}`,
  })
  priority?: ProjectPriority;
}
