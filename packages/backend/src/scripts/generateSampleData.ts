import { createDatabaseConnection } from '../config/typeorm';
import { Field } from '../entities/Field';
import { Team } from '../entities/Team';
import { Game } from '../entities/Game';
import { User } from '../entities/User';
import { TeamMember } from '../entities/TeamMember';
import { FieldSchedule } from '../entities/FieldSchedule';
import { addDays } from 'date-fns';

async function generateSampleData() {
  const dataSource = await createDatabaseConnection();
  
  // Create a manager user
  const manager = new User();
  manager.email = 'manager@example.com';
  manager.name = 'Field Manager';
  manager.role = 'field_manager';
  await dataSource.manager.save(manager);

  // Create fields
  const fields = [
    {
      name: 'Kyiv Football Arena',
      district: 'Kyiv',
      address: '123 Main St, Kyiv',
      maxPlayersCount: 10,
      priceFrom: 1000,
      priceTo: 2000,
      numberOfSeats: 20,
      managerId: manager.id,
      latitude: 50.4501,
      longitude: 30.5234,
      lengthMeters: 100,
      widthMeters: 60
    },
    {
      name: 'Kyiv Sports Center',
      district: 'Kyiv',
      address: '456 Sports Ave, Kyiv',
      maxPlayersCount: 8,
      priceFrom: 800,
      priceTo: 1500,
      numberOfSeats: 15,
      managerId: manager.id,
      latitude: 50.4501,
      longitude: 30.5234,
      lengthMeters: 80,
      widthMeters: 50
    }
  ];

  const savedFields = await Promise.all(
    fields.map(async (fieldData) => {
      const field = new Field();
      Object.assign(field, fieldData);
      return dataSource.manager.save(field);
    })
  );

  // Create teams
  const teams = [
    { name: 'Kyiv United', createdBy: manager.id },
    { name: 'Kyiv Stars', createdBy: manager.id },
    { name: 'Kyiv Warriors', createdBy: manager.id },
    { name: 'Kyiv Eagles', createdBy: manager.id }
  ];

  const savedTeams = await Promise.all(
    teams.map(async (teamData) => {
      const team = new Team();
      Object.assign(team, teamData);
      return dataSource.manager.save(team);
    })
  );

  // Create team members
  for (const team of savedTeams) {
    const teamMember = new TeamMember();
    teamMember.team = team;
    teamMember.user = manager;
    teamMember.role = 'admin';
    await dataSource.manager.save(teamMember);
  }

  // Create games
  const today = new Date();
  const games = [];

  for (let i = 0; i < 10; i++) {
    const game = new Game();
    game.field = savedFields[i % savedFields.length];
    game.teamA = savedTeams[i % savedTeams.length];
    game.teamB = savedTeams[(i + 1) % savedTeams.length];
    game.date = addDays(today, i);
    game.startTime = new Date(game.date);
    game.startTime.setHours(18, 0, 0);
    game.endTime = new Date(game.date);
    game.endTime.setHours(20, 0, 0);
    game.status = 'scheduled';
    games.push(game);
  }

  await dataSource.manager.save(games);

  // Create field schedules
  for (const field of savedFields) {
    for (let i = 0; i < 7; i++) {
      const schedule = new FieldSchedule();
      schedule.field = field;
      schedule.date = addDays(today, i);
      
      const startTimeDate = new Date(schedule.date);
      startTimeDate.setHours(8, 0, 0);
      schedule.startTime = startTimeDate;
      
      const endTimeDate = new Date(schedule.date);
      endTimeDate.setHours(22, 0, 0);
      schedule.endTime = endTimeDate;
      
      schedule.status = 'available';
      await dataSource.manager.save(schedule);
    }
  }

  console.log('Sample data generated successfully!');
  await dataSource.destroy();
}

generateSampleData().catch(console.error); 