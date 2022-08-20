import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';
import Teams from './teams';

class Matches extends Model {
  id!: number;
  teamName!: string;
}

Matches.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    allowNull: false,
    type: INTEGER,
  },
  homeTeamGoals: {
    allowNull: false,
    type: STRING,
  },
  awayTeam: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeamGoals: {
    allowNull: false,
    type: STRING,
  },
  inProgress: {
    allowNull: false,
    type: STRING,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  underscored: true,
  timestamps: false,
});

Matches.hasMany(Teams, { foreignKey: 'homeTeam', as: 'id' });
Matches.hasMany(Teams, { foreignKey: 'awayTeam', as: 'id' });

export default Matches;
