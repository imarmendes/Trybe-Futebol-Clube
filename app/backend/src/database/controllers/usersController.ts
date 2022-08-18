import { Request, Response } from 'express';
import UserService from '../service/usersService';

export default class UserController {
  static async login(req: Request, res: Response): Promise<void> {
    const token = await UserService.login(req.body);
    res.status(200).json({ token });
  }
}
