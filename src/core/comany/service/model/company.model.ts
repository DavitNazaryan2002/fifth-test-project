import { Project } from './project.model';
import { CompanyDocument } from '../../repository/model/company.schema';

export class Company {
  id: string;
  name: string;
  industry?: string;
  projects: Project[];

  static fromDocument(companyDocument: CompanyDocument): Company {
    return {
      id: companyDocument._id.toString(),
      projects: companyDocument.projects.map((project) =>
        Project.fromDocument(project),
      ),
      industry: companyDocument.industry,
      name: companyDocument.name,
    };
  }
}
