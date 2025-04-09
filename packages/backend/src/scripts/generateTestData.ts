import { createDatabaseConnection } from '../config/typeorm';
import { User } from '../entities/User';
import { Team } from '../entities/Team';
import { TeamMember } from '../entities/TeamMember';
import { Field } from '../entities/Field';
import { FieldSchedule } from '../entities/FieldSchedule';
import { Game } from '../entities/Game';
import { faker } from '@faker-js/faker';

async function generateTestData() {
  console.log('Starting test data generation...');
  
  try {
    console.log('Connecting to database...');
    const dataSource = await createDatabaseConnection();
    console.log('Database connection established');
    
    // Get repositories
    const userRepository = dataSource.getRepository(User);
    const teamRepository = dataSource.getRepository(Team);
    const teamMemberRepository = dataSource.getRepository(TeamMember);
    const fieldRepository = dataSource.getRepository(Field);
    const fieldScheduleRepository = dataSource.getRepository(FieldSchedule);
    const gameRepository = dataSource.getRepository(Game);

    // Clean up existing data
    console.log('Cleaning up existing data...');
    await gameRepository.delete({});
    await fieldScheduleRepository.delete({});
    await fieldRepository.delete({});
    await teamMemberRepository.delete({});
    await teamRepository.delete({});
    await userRepository.delete({});
    console.log('Existing data cleaned up');

    console.log('Generating test data...');

    // Generate users
    console.log('Generating users...');
    const users = Array.from({ length: 20 }, () => {
      const user = new User();
      user.name = faker.person.fullName();
      user.email = faker.internet.email();
      user.passwordHash = '$2a$10$X7J3Q5v8Y5Z9A0B1C2D3E4F5G6H7I8J9K0L1M2N3O4P5Q6R7S8T9U0V1W2X3Y4Z'; // Default test password hash
      return user;
    });
    await userRepository.save(users);
    console.log('Generated 20 users');

    // Generate teams
    console.log('Generating teams...');
    const teams = Array.from({ length: 10 }, () => {
      const team = new Team();
      team.name = faker.company.name();
      team.description = faker.lorem.sentence();
      team.createdBy = faker.helpers.arrayElement(users).id;
      return team;
    });
    await teamRepository.save(teams);
    console.log('Generated 10 teams');

    // Add users to teams
    console.log('Adding users to teams...');
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
    console.log('Generating fields...');
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
    console.log('Generating field schedules...');
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
    console.log('Generating games...');
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

    console.log('Test data generation completed successfully!');
  } catch (error) {
    console.error('Error generating test data:', error);
    throw error;
  }
}

// Run the script
generateTestData().catch(error => {
  console.error('Failed to generate test data:', error);
  process.exit(1);
}); 