import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Permission {
  READ = 'READ',
  WRITE = 'WRITE',
  DELETE = 'DELETE',
  ADMIN = 'ADMIN',
}

@Schema()
export class UserCompanyEntity extends Document {
  @Prop({ required: true })
  user_id: string;
  @Prop({ name: 'company_id', required: true })
  company_id: string;
  @Prop({
    type: [String],
    enum: Permission,
    default: [Permission.READ],
  })
  permissions: Permission[];
}

export const UserCompanySchema =
  SchemaFactory.createForClass(UserCompanyEntity);
