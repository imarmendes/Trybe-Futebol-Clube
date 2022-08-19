import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../service/usersService';

export default class UserController {
  static async login(req: Request, res: Response): Promise<void> {
    const token = await UserService.login(req.body);
    res.status(StatusCodes.OK).json({ token });
  }

  static async validate(req: Request, res: Response): Promise<void> {
    const { authorization } = req.headers;
    const role = await UserService.validate(authorization);
    res.status(StatusCodes.OK).json({ role });
  }
}
