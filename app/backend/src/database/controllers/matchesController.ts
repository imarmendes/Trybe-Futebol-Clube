import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IMatches } from '../interfaces/IMatches';
import JwtService from '../service/JwtService';
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

  static async createMatches(req: Request, res: Response): Promise<void> {
    const { authorization } = req.headers;
    if (authorization) {
      try {
        JwtService.decode(authorization);
      } catch (error) {
        const e = new Error('Token must be a valid token');
        e.name = 'NotFoundError';
        throw e;
      }
    }
    const matchesIn: IMatches = req.body;
    const matches = await MatchesService.createMatches(matchesIn);
    res.status(StatusCodes.CREATED).json(matches);
  }

  static async finishMatches(req: Request, res: Response): Promise<void> {
    await MatchesService.finishMatches(+req.params.id);
    res.status(StatusCodes.OK).json({ message: 'Finished' });
  }

  static async updateMatches(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { body } = req;
    await MatchesService.updateMatches(+id, body.homeTeamGoals, body.awayTeamGoals);
    res.status(StatusCodes.OK).json({ message: 'Updated' });
  }
}
