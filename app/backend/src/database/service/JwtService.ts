import * as jwt from 'jsonwebtoken';
import { IToken } from '../interfaces/IToken';

export default class JwtService {
  static sign(payload: { id: number, email: string }): string {
    return jwt.sign(payload, process.env.JWT_SECRET || 'jwt_secret');
  }

  static decode(token: string): IToken {
    const tokenVerify = jwt.verify(token, process.env.JWT_SECRET || 'jwt_secret');
    return tokenVerify as IToken;
  }
}
