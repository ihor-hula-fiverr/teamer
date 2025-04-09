import { DataSource } from 'typeorm/data-source/DataSource';
import { Team } from '../entities/Team';
import { TeamMember } from '../entities/TeamMember';
import { User } from '../entities/User';
import { Field } from '../entities/Field';
import { FieldSchedule } from '../entities/FieldSchedule';
import { Game } from '../entities/Game';

export const createDatabaseConnection = async () => {
  const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'ihor.hula', // Your macOS username
    password: '', // No password for local development
    database: 'teamer',
    synchronize: true, // Set to false in production
    logging: true,
    entities: [User, Team, TeamMember, Field, FieldSchedule, Game],
    migrations: [],
    subscribers: [],
  });

  return dataSource.initialize();
}; 