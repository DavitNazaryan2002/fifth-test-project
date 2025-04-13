import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  ProjectPriority,
  ProjectStatus,
} from '../../../../../core/comany/repository/model/project.schema';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddProjectRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(ProjectStatus, {
    message: `status must be one of: ${Object.values(ProjectStatus).join(', ')}`,
  })
  status: ProjectStatus;

  @ApiPropertyOptional({ default: [] })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  tags: string[] = [];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(ProjectPriority, {
    message: `priority must be one of: ${Object.values(ProjectPriority).join(', ')}`,
  })
  priority?: ProjectPriority;
}
