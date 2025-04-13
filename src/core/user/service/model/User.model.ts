import { UserEntity } from '../../repository/model/user.schema';

export class User {
  name: string;
  email: string;
  password: string;

  static fromUserEntity(userEntity: UserEntity) {
    return {
      name: userEntity.name,
      email: userEntity.email,
      password: userEntity.password,
    };
  }
}
