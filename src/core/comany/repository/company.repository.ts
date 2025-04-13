import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompanyDocument, CompanyEntity } from './model/company.schema';
import {
  ProjectDocument,
  ProjectPriority,
  ProjectStatus,
} from './model/project.schema';

@Injectable()
export class CompanyRepository {
  constructor(
    @InjectModel(CompanyEntity.name)
    private companyModel: Model<CompanyDocument>,
  ) {}

  public async deleteProject(
    companyId: string,
    projectId: string,
  ): Promise<void> {
    const company = await this.companyModel.findOne({ _id: companyId });
    if (!company) {
      throw new NotFoundException(`Company with id: ${companyId} not found`);
    }

    const filteredProjects = company.projects.filter(
      (project) => project._id.toString() != projectId,
    );
    await this.companyModel.findOneAndUpdate(
      { _id: companyId },
      { $set: { projects: filteredProjects } },
      {
        new: true
      }
    );
  }

  public async addProject(
    companyId: string,
    name: string,
    status: ProjectStatus,
    tags: string[],
    description?: string,
    priority?: ProjectPriority,
  ): Promise<ProjectDocument> {
    const company = await this.companyModel.findOne({ _id: companyId });
    if (!company) {
      throw new NotFoundException(`Company with id: ${companyId} not found`);
    }

    if (company.projects.some((project) => project.name === name)) {
      throw new BadRequestException(
        `Company: ${company.name} already has a project named: ${name}`,
      );
    }

    const updated = await this.companyModel.findOneAndUpdate(
      { _id: companyId },
      {
        $push: {
          projects: {
            name,
            description,
            status,
            tags,
            priority,
          },
        },
      },
      {
        new: true
      }
    );

    console.log(updated);

    return updated!.projects.find((project) => project.name === name)!;
  }

  public async createCompany(
    name: string,
    industry?: string,
  ): Promise<CompanyDocument> {
    const existing = await this.companyModel.findOne({ name });
    if (existing) {
      throw new BadRequestException('Company name is taken');
    }

    return await this.companyModel.insertOne({ name, industry, projects: [] });
  }

  public async getProjectsByCompanyId(
    companyId: string,
  ): Promise<ProjectDocument[]> {
    const company = await this.companyModel.findOne({ _id: companyId });
    if (!company) {
      throw new NotFoundException(`Company with id: ${companyId} not found`);
    }

    return company.projects;
  }
}
