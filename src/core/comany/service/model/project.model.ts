import {
  ProjectDocument,
  ProjectPriority,
  ProjectStatus,
} from '../../repository/model/project.schema';

export class Project {
  id: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  priority?: ProjectPriority;
  tags?: string[];

  static fromDocument(projectDocument: ProjectDocument): Project {
    return {
      id: projectDocument._id.toString(),
      name: projectDocument.name,
      description: projectDocument.description,
      status: projectDocument.status,
      priority: projectDocument.priority,
      tags: projectDocument.tags,
    };
  }
}
