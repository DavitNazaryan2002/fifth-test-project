import { ProjectPriority, ProjectStatus } from '../../../../../core/comany/repository/model/project.schema';

export class ProjectResponse {
  id: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  priority?: ProjectPriority;
  tags?: string[];
}
