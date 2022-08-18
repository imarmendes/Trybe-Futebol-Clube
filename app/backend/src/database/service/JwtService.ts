import * as jwt from 'jsonwebtoken';

export default class JwtService {
  static sign(payload: { id: number, email: string }): string {
    return jwt.sign(payload, process.env.JWT_SECRET || 'jwt_secret');
  }
}
