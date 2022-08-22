import Matches from '../models/matches';
import Teams from '../models/teams';

export default class MatchesService {
  static async listAll(): Promise<Matches[]> {
    const matches = Matches.findAll({
      include: [{
        model: Teams,
        as: 'teamHome',
        attributes: ['teamName'],
      },
      {
        model: Teams,
        as: 'teamAway',
        attributes: ['teamName'],
      }],
    });
    return matches;
  }

  static async inProgress(inProgress: string): Promise<Matches[] | null> {
    const matches = await Matches.findAll({
      include: [{
        model: Teams,
        as: 'teamHome',
        attributes: ['teamName'],
      },
      {
        model: Teams,
        as: 'teamAway',
        attributes: ['teamName'],
      }],
      where: { inProgress: JSON.parse(inProgress) } });
    return matches as any as Matches[];
  }
}
