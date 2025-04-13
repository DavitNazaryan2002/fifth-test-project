import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Automatically loads .env variables
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/Fifth'), AuthModule, UserModule,
  ],
})
export class CoreModule {}
