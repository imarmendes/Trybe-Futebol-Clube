import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import TeamsService from '../service/temsService';

export default class TeamsController {
  static async listAll(req: Request, res: Response): Promise<void> {
    const teams = await TeamsService.listAll();
    res.status(StatusCodes.OK).json(teams);
  }

  static async list(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const team = await TeamsService.list(+id);
    res.status(StatusCodes.OK).json(team);
  }
}
