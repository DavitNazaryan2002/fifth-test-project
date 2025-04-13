import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddCompanyRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  industry?: string;
}
