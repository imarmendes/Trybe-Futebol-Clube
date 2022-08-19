import * as bcryptjs from 'bcryptjs';
import UserValidate from '../middlewares/userValidate';
import User from '../models/user';
// import { passwordService } from "./passwordService";
import JwtService from './JwtService';

export default class UserService {
  static async login({ email, password }: User): Promise<string> {
    UserValidate.validate(email, password);
    const user = await User.findOne({ where: { email } });

    if (!user) {
      const e = new Error('Incorrect email or password');
      e.name = 'NotFoundError';
      throw e;
    }

    if (!bcryptjs.compareSync(password, user.password)) {
      const e = new Error('Password not valid');
      e.name = 'NotFoundError';
      throw e;
    }

    const token = JwtService.sign({
      id: user.id,
      email: user.email,
    });

    return token;
  }
}
