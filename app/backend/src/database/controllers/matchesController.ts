import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import MatchesService from '../service/matchesService';

export default class MatchesController {
  static async listMatches(req: Request, res: Response): Promise<void> {
    const { inProgress } = req.query;

    if (inProgress) {
      const matches = await MatchesService.inProgress(String(inProgress));
      res.status(StatusCodes.OK).json({ matches });
      return;
    }

    const matches = await MatchesService.listAll();
    res.status(StatusCodes.OK).json(matches);
  }
}
