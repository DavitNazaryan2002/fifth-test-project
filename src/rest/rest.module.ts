import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth/AuthController';
import { CoreModule } from '../core/core.module';

@Module({
  imports: [CoreModule],
  controllers: [AuthController],
})
export class RestModule {}
