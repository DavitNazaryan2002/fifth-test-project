import { Prop, SchemaFactory } from '@nestjs/mongoose';

export enum Permission {
  READ = 'READ',
  WRITE = 'WRITE',
  DELETE = 'DELETE',
  ADMIN = 'ADMIN',
}

export class UserCompanyEntity extends Document {
  @Prop({ required: true })
  user_id: string;
  @Prop({ required: true })
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
