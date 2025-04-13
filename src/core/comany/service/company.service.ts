import { ForbiddenException, Inject } from '@nestjs/common';
import { CompanyRepository } from '../repository/company.repository';
import { Permission } from '../repository/model/user-company.schema';
import { UserCompanyRepository } from '../repository/user-company.repository';
import { Company } from './model/company.model';
import { User } from '../../user/service/model/User.model';
import { Project } from './model/project.model';
import {
  ProjectPriority,
  ProjectStatus,
} from '../repository/model/project.schema';

export class CompanyService {
  constructor(
    @Inject() private companyRepository: CompanyRepository,
    @Inject() private userCompanyRepository: UserCompanyRepository,
  ) {}

  public async addCompany(name: string, industry?: string): Promise<Company> {
    const companyDocument = await this.companyRepository.createCompany(
      name,
      industry,
    );
    return Company.fromDocument(companyDocument);
  }

  public async getProjects(
    reqUser: User,
    companyId: string,
  ): Promise<Project[]> {
    await this.validateCompanyPermission(reqUser, companyId, Permission.READ);
    const projects =
      await this.companyRepository.getProjectsByCompanyId(companyId);
    return projects.map((project) => Project.fromDocument(project));
  }

  public async addProject(
    reqUser: User,
    companyId: string,
    name: string,
    status: ProjectStatus,
    tags: string[],
    description?: string,
    priority?: ProjectPriority,
  ): Promise<Project> {
    await this.validateCompanyPermission(reqUser, companyId, Permission.WRITE);
    const project = await this.companyRepository.addProject(
      companyId,
      name,
      status,
      tags,
      description,
      priority,
    );
    return Project.fromDocument(project);
  }

  public async deleteProject(
    reqUser: User,
    companyId: string,
    projectId: string,
  ): Promise<void> {
    await this.validateCompanyPermission(reqUser, companyId, Permission.DELETE);
    return this.companyRepository.deleteProject(companyId, projectId);
  }

  private async validateCompanyPermission(
    reqUser: User,
    companyId: string,
    permission: Permission,
  ) {
    const userId = reqUser.id;
    const userCompanyEntity =
      await this.userCompanyRepository.findByUserAndCompany(userId, companyId);
    if (
      userCompanyEntity == null ||
      !userCompanyEntity.permissions.includes(permission)
    ) {
      throw new ForbiddenException(
        `User: ${userId} does not have permission ${permission} at the company: ${companyId}`,
      );
    }
  }
}
