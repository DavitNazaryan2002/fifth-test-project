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
import { UserService } from '../../user/service/user.service';

export class CompanyService {
  constructor(
    @Inject() private companyRepository: CompanyRepository,
    @Inject() private userCompanyRepository: UserCompanyRepository,
    @Inject() private userService: UserService,
  ) {}

  public async grantPermission(
    reqUser: User,
    companyId: string,
    receiverId: string,
    permission: Permission,
  ): Promise<void> {
    await this.validateCompanyPermission(reqUser, companyId, Permission.ADMIN);
    const user = await this.userService.findUserById(receiverId);
    await this.userCompanyRepository.addPermissionToUser(
      user.id,
      companyId,
      permission,
    );
  }

  public async revokePermission(
    reqUser: User,
    companyId: string,
    receiverId: string,
    permission: Permission,
  ): Promise<void> {
    await this.validateCompanyPermission(reqUser, companyId, Permission.ADMIN);
    const user = await this.userService.findUserById(receiverId);
    await this.userCompanyRepository.revokePermission(
      user.id,
      companyId,
      permission,
    );
  }

  public async addCompany(
    user: User,
    name: string,
    industry?: string,
  ): Promise<Company> {
    const companyDocument = await this.companyRepository.createCompany(
      name,
      industry,
    );
    await this.userCompanyRepository.addPermissionToUser(
      user.id,
      companyDocument._id.toString(),
      Permission.ADMIN,
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
      !(
        userCompanyEntity.permissions.includes(permission) ||
        userCompanyEntity.permissions.includes(Permission.ADMIN)
      )
    ) {
      throw new ForbiddenException(
        `User: ${userId} does not have permission ${permission} at the company: ${companyId}`,
      );
    }
  }
}
