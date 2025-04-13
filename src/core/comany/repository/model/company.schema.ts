import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ProjectDocument, ProjectSchema } from './project.schema';

@Schema()
export class CompanyEntity {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  industry?: string;

  @Prop({ type: [ProjectSchema], default: [] })
  projects: ProjectDocument[];
}

export type CompanyDocument = HydratedDocument<CompanyEntity>;
export const CompanySchema = SchemaFactory.createForClass(CompanyEntity);
