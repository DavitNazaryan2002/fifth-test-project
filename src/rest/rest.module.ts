import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth/auth.controller';
import { CoreModule } from '../core/core.module';
import { CompanyController } from './controller/company/company.controller';

@Module({
  imports: [CoreModule],
  controllers: [AuthController, CompanyController],
})
export class RestModule {}
