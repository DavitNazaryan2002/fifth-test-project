import { ProjectResponse } from './project.dt';

export class CompanyResponse {
  id: string;
  name: string;
  industry?: string;
  projects: ProjectResponse[];
}
