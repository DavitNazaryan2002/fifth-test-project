import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from '../../../core/comany/service/company.service';
import { AddCompanyRequest } from './dto/request/add-company.dto';
import { CompanyResponse } from './dto/response/company.dto';
import { BasicAuthGuard } from '../../guards/basic-auth.guard';
import { User } from '../../../core/user/service/model/User.model';
import { AddProjectRequest } from './dto/request/add-project.dto';
import { ProjectResponse } from './dto/response/project.dt';

@Controller('/companies')
export class CompanyController {
  constructor(@Inject() private companyService: CompanyService) {}

  @Post('/')
  async addCompany(
    @Body() addCompanyDto: AddCompanyRequest,
  ): Promise<{ company: CompanyResponse }> {
    const { name, industry } = addCompanyDto;
    const company = await this.companyService.addCompany(name, industry);
    return { company };
  }

  @Get('/:companyId/projects')
  @UseGuards(BasicAuthGuard)
  async getProjects(
    @Req() req: Request,
    @Param('companyId') companyId: string,
  ): Promise<{ projects: ProjectResponse[] }> {
    const user = req['user'] as User;
    const projects = await this.companyService.getProjects(user, companyId);
    return { projects };
  }

  @Post('/:companyId/projects')
  @UseGuards(BasicAuthGuard)
  async addProject(
    @Req() req: Request,
    @Param('companyId') companyId: string,
    @Body() body: AddProjectRequest,
  ): Promise<{ project: ProjectResponse }> {
    const user = req['user'] as User;
    const project = await this.companyService.addProject(
      user,
      companyId,
      body.name,
      body.status,
      body.tags,
      body.description,
      body.priority,
    );
    return { project };
  }

  @Delete('/:companyId/projects/:projectId')
  @UseGuards(BasicAuthGuard)
  async deleteProject(
    @Req() req: Request,
    @Param('companyId') companyId: string,
    @Param('projectId') projectId: string,
  ): Promise<void> {
    const user = req['user'] as User;
    await this.companyService.deleteProject(user, companyId, projectId);
  }
}
