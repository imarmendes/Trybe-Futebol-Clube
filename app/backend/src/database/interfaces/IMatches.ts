export interface IMatches {
  id?: number,
  homeTeam: number,
  awayTeam: string,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress?: boolean,
  teamHome: { [key: string]: string }
  teamAway: { [key: string]: string }
}
