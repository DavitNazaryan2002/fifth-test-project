import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false }) // Optional: no separate _id for each project
export class ProjectEntity extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({required: false})
  description?: string;

  @Prop({ required: true })
  status: string;

  @Prop({ enum: [1, 2, 3], required: false })
  priority?: number; // 1 = High, 2 = Medium, 3 = Low

  @Prop({ type: [String] })
  tags?: string[];
}

export const ProjectSchema = SchemaFactory.createForClass(ProjectEntity);
