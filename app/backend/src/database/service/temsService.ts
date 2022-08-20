import Teams from '../models/teams';

export default class TeamsService {
  static async listAll(): Promise<Teams[]> {
    const teams = Teams.findAll();
    return teams;
  }

  static async list(id: number): Promise<Teams | null> {
    const team = Teams.findByPk(id);
    if (!team) {
      const e = new Error('Team not found');
      e.name = 'NotFoundError';
      throw e;
    }

    return team;
  }
}
