import { ILeaderboard } from '../interfaces/ILeaderboard';
import { IMatches } from '../interfaces/IMatches';
import MatchesService from './matchesService';
import TeamsService from './temsService';

export default class LeaderboardService {
  static async leaderboardPrepare(): Promise<{ [key:string]: ILeaderboard }> {
    const teams = await TeamsService.listAll();
    const leaderboard = {} as { [key:string]: ILeaderboard };

    teams.forEach((team) => {
      leaderboard[team.teamName] = {
        name: '',
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: 0.0 };
    });

    return leaderboard;
  }

  static points(goalsFavor: number, goalsOwn: number): number {
    if (goalsFavor > goalsOwn) return 3;
    if (goalsFavor === goalsOwn) return 1;
    return 0;
  }

  static async makeLeaderboard(matches: IMatches[]): Promise<{ [key:string]: ILeaderboard }> {
    const leaderboard = await this.leaderboardPrepare();

    matches.forEach((matche) => {
      const name = matche.teamHome.teamName;
      const points = this.points(matche.homeTeamGoals, matche.awayTeamGoals);

      leaderboard[name].name = name;
      leaderboard[name].totalPoints += points;
      leaderboard[name].totalGames += 1;
      leaderboard[name].totalVictories += points === 3 ? 1 : 0;
      leaderboard[name].totalDraws += points === 1 ? 1 : 0;
      leaderboard[name].totalLosses += points === 0 ? 1 : 0;
      leaderboard[name].goalsFavor += matche.homeTeamGoals;
      leaderboard[name].goalsOwn += matche.awayTeamGoals;
      leaderboard[name].goalsBalance += matche.homeTeamGoals - matche.awayTeamGoals;
      leaderboard[name].efficiency = +((leaderboard[name]
        .totalPoints / (leaderboard[name].totalGames * 3)) * 100).toFixed(2);
    });

    return leaderboard;
  }

  static sort(l:ILeaderboard[]):ILeaderboard[] {
    l.sort((a, b) => b.totalPoints - a.totalPoints
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsFavor);
    return l;
  }

  static async home(): Promise<ILeaderboard[]> {
    const matches = await MatchesService.inProgress('false');
    // console.log(matches);

    const leaderboardObj:{ [key:string]: ILeaderboard } = await this.makeLeaderboard(matches);
    // console.log(leaderboardObj);

    const leaderboard: ILeaderboard[] = Object.values(leaderboardObj);

    const leaderboardSorted = this.sort(leaderboard);

    return leaderboardSorted;
  }
}
