import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LeaderboardService from '../service/leaderboardService';

export default class LeaderboardController {
  static async home(_req: Request, res: Response): Promise<void> {
    const leaderboard = await LeaderboardService.home();
    res.status(StatusCodes.OK).json(leaderboard);
  }
}
