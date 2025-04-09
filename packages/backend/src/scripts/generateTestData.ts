import { createDatabaseConnection } from '../config/typeorm';
import { User } from '../entities/User';
import { Team } from '../entities/Team';
import { TeamMember } from '../entities/TeamMember';
import { Field } from '../entities/Field';
import { FieldSchedule } from '../entities/FieldSchedule';
import { Game } from '../entities/Game';
import { faker } from '@faker-js/faker';

async function generateTestData() {
  const dataSource = await createDatabaseConnection();
  
  // Get repositories
  const userRepository = dataSource.getRepository(User);
  const teamRepository = dataSource.getRepository(Team);
  const teamMemberRepository = dataSource.getRepository(TeamMember);
  const fieldRepository = dataSource.getRepository(Field);
  const fieldScheduleRepository = dataSource.getRepository(FieldSchedule);
  const gameRepository = dataSource.getRepository(Game);

  // Check if we already have data
  const userCount = await userRepository.count();
  if (userCount > 0) {
    console.log('Test data already exists. Skipping generation.');
    return;
  }

  console.log('Generating test data...');

  // Generate users
  const users = Array.from({ length: 20 }, () => {
    const user = new User();
    user.name = faker.person.fullName();
    user.email = faker.internet.email();
    return user;
  });
  await userRepository.save(users);
  console.log('Generated 20 users');

  // Generate teams
  const teams = Array.from({ length: 10 }, () => {
    const team = new Team();
    team.name = faker.company.name();
    team.description = faker.lorem.sentence();
    return team;
  });
  await teamRepository.save(teams);
  console.log('Generated 10 teams');

  // Add users to teams
  for (const team of teams) {
    const membersCount = faker.number.int({ min: 5, max: 11 });
    const selectedUsers = faker.helpers.shuffle(users).slice(0, membersCount);
    
    for (const user of selectedUsers) {
      const member = new TeamMember();
      member.team = team;
      member.user = user;
      member.role = faker.helpers.arrayElement(['admin', 'member']);
      await teamMemberRepository.save(member);
    }
  }
  console.log('Added users to teams');

  // Generate fields
  const fields = Array.from({ length: 5 }, () => {
    const field = new Field();
    field.name = faker.company.name() + ' Field';
    field.location = faker.location.streetAddress();
    field.capacity = faker.number.int({ min: 5, max: 11 }) * 2;
    field.description = faker.lorem.sentence();
    field.pricePerHour = faker.number.int({ min: 50, max: 200 });
    return field;
  });
  await fieldRepository.save(fields);
  console.log('Generated 5 fields');

  // Generate field schedules
  for (const field of fields) {
    const schedules = Array.from({ length: 7 }, (_, i) => {
      const schedule = new FieldSchedule();
      schedule.field = field;
      schedule.date = new Date(Date.now() + i * 24 * 60 * 60 * 1000);
      
      const startTime = new Date(schedule.date);
      startTime.setHours(9, 0, 0, 0);
      schedule.startTime = startTime.toISOString();
      
      const endTime = new Date(schedule.date);
      endTime.setHours(21, 0, 0, 0);
      schedule.endTime = endTime.toISOString();
      
      schedule.status = 'available';
      return schedule;
    });
    await fieldScheduleRepository.save(schedules);
  }
  console.log('Generated field schedules');

  // Generate games
  const games = Array.from({ length: 10 }, (_, i) => {
    const game = new Game();
    game.field = faker.helpers.arrayElement(fields);
    game.teamA = faker.helpers.arrayElement(teams);
    game.teamB = faker.helpers.arrayElement(teams.filter(t => t.id !== game.teamA.id));
    game.date = new Date(Date.now() + i * 2 * 24 * 60 * 60 * 1000);
    game.startTime = new Date(game.date);
    game.startTime.setHours(18, 0, 0, 0);
    game.endTime = new Date(game.date);
    game.endTime.setHours(20, 0, 0, 0);
    game.status = faker.helpers.arrayElement(['scheduled', 'in_progress', 'completed']);
    if (game.status === 'completed') {
      game.score = {
        teamA: faker.number.int({ min: 0, max: 5 }),
        teamB: faker.number.int({ min: 0, max: 5 })
      };
    }
    return game;
  });
  await gameRepository.save(games);
  console.log('Generated 10 games');

  console.log('Test data generation completed!');
}

generateTestData().catch(console.error); 