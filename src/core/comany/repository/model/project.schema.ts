import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum ProjectStatus {
  ACTIVE = 'Active',
  ARCHIVED = 'Archived',
  PAUSED = 'Paused', // optional: add more if needed
}

export enum ProjectPriority {
  HIGH = 1,
  MEDIUM = 2,
  LOW = 3,
}

@Schema({ _id: false }) // Optional: no separate _id for each project
export class ProjectEntity {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: true })
  status: ProjectStatus;

  @Prop({ enum: ProjectPriority, required: false })
  priority?: number; // 1 = High, 2 = Medium, 3 = Low

  @Prop({ type: [String] })
  tags?: string[];
}

export type ProjectDocument = HydratedDocument<ProjectEntity>;
export const ProjectSchema = SchemaFactory.createForClass(ProjectEntity);
