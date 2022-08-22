import { IMatches } from '../interfaces/IMatches';
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

  static async createMatches(matchesIn: IMatches): Promise<IMatches> {
    if (matchesIn.homeTeam === matchesIn.awayTeam) {
      const e = new Error('It is not possible to create a match with two equal teams');
      e.name = 'NotFoundError';
      throw e;
    }
    if (matchesIn.homeTeam && matchesIn.awayTeam) {
      const teamHome = await Teams.findByPk(+matchesIn.homeTeam);
      const awayTeam = await Teams.findByPk(+matchesIn.awayTeam);
      if (!teamHome || !awayTeam) {
        const e = new Error('There is no team with such id!');
        e.name = 'NotFound';
        throw e;
      }
    }
    const matches: IMatches = await Matches.create({ ...matchesIn, inProgress: true });
    return matches;
  }

  static async finishMatches(id: number) {
    await Matches.update({ inProgress: false }, { where: { id } });
  }

  static async updateMatches(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    await Matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }
}
