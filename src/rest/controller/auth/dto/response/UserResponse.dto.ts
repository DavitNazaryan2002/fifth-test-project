import { User } from '../../../../../core/user/service/model/User.model';

export class UserResponse {
  name: string;
  email: string;

  static fromUser(user: User) {
    return {
      name: user.name,
      email: user.email,
    };
  }
}
