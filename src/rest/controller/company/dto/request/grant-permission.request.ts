import { IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';
import { Permission } from '../../../../../core/comany/repository/model/user-company.schema';

export class GrantPermissionRequest {
  @IsNotEmpty()
  @IsMongoId({ message: 'receiverId must be a valid MongoDB ObjectId' })
  receiverId: string;

  @IsNotEmpty()
  @IsEnum(Permission, {
    message: `permission must be one of: ${Object.values(Permission).join(', ')}`,
  })
  permission: Permission;
}
