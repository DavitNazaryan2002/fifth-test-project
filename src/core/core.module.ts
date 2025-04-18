import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CompanyModule } from './comany/company.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Automatically loads .env variables
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/Fifth', {
      onConnectionCreate: () => {
        console.log("CONNECTED TO DATABASE")
      }
    }), AuthModule, UserModule, CompanyModule,
  ],
  exports: [AuthModule, CompanyModule, UserModule]
})
export class CoreModule {}
