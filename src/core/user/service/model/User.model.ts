import { UserDocument } from '../../repository/model/user.schema';

export class User {
  id: string;
  name: string;
  email: string;
  password: string;

  static fromDocument(userDocument: UserDocument) {
    return {
      id: userDocument._id.toString(),
      name: userDocument.name,
      email: userDocument.email,
      password: userDocument.password
    }
  }
}
