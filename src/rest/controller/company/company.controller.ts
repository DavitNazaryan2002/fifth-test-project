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
import { BasicAuthGuard } from '../../guards/basic-auth.guard';
import { User } from '../../../core/user/service/model/User.model';
import { AddProjectRequest } from './dto/request/add-project.dto';
import { GrantPermissionRequest } from './dto/request/grant-permission.request';
import {
  ApiBasicAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AddCompanyResponse } from './dto/response/add-company.response';
import { GetProjectsResponse } from './dto/response/get-projects.response';
import { AddProjectResponse } from './dto/response/add-project.response.dto';

@Controller('/companies')
@ApiTags('Companies and Projects')
@ApiBasicAuth()
@UseGuards(BasicAuthGuard)
export class CompanyController {
  constructor(@Inject() private companyService: CompanyService) {}

  @Post('/')
  @ApiOperation({
    summary: 'Add Company',
  })
  @ApiResponse({
    type: AddCompanyResponse,
  })
  async addCompany(
    @Req() req: Request,
    @Body() addCompanyDto: AddCompanyRequest,
  ): Promise<AddCompanyResponse> {
    const user = req['user'] as User;
    const { name, industry } = addCompanyDto;
    const company = await this.companyService.addCompany(user, name, industry);
    return { company };
  }

  @Get('/:companyId/projects')
  @ApiOperation({
    summary: 'Get Projects',
  })
  @ApiResponse({
    type: GetProjectsResponse,
  })
  async getProjects(
    @Req() req: Request,
    @Param('companyId') companyId: string,
  ): Promise<GetProjectsResponse> {
    const user = req['user'] as User;
    const projects = await this.companyService.getProjects(user, companyId);
    return { projects };
  }

  @Post('/:companyId/projects')
  @ApiOperation({
    summary: 'Add Project',
  })
  @ApiResponse({
    type: AddProjectResponse,
  })
  async addProject(
    @Req() req: Request,
    @Param('companyId') companyId: string,
    @Body() body: AddProjectRequest,
  ): Promise<AddProjectResponse> {
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
  @ApiOperation({
    summary: 'Delete Project',
  })
  async deleteProject(
    @Req() req: Request,
    @Param('companyId') companyId: string,
    @Param('projectId') projectId: string,
  ): Promise<void> {
    const user = req['user'] as User;
    await this.companyService.deleteProject(user, companyId, projectId);
  }

  @Post('/:companyId/permissions')
  @ApiOperation({
    summary: 'Grant Permission',
  })
  async grantPermission(
    @Req() req: Request,
    @Param('companyId') companyId: string,
    @Body() body: GrantPermissionRequest,
  ): Promise<void> {
    const user = req['user'] as User;
    await this.companyService.grantPermission(
      user,
      companyId,
      body.receiverId,
      body.permission,
    );
  }

  @Delete('/:companyId/permissions')
  @ApiOperation({
    summary: 'Revoke Permission',
  })
  async revokePermission(
    @Req() req: Request,
    @Param('companyId') companyId: string,
    @Body() body: GrantPermissionRequest,
  ): Promise<void> {
    const user = req['user'] as User;
    await this.companyService.revokePermission(
      user,
      companyId,
      body.receiverId,
      body.permission,
    );
  }
}
