import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProjectEntity, ProjectSchema } from './project.schema';

@Schema()
export class CompanyEntity extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({required: false})
  industry?: string;

  @Prop({ type: [ProjectSchema], default: [] })
  projects: ProjectEntity[];
}

export const CompanySchema = SchemaFactory.createForClass(CompanyEntity);
