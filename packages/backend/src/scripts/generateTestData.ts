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
    const users = Array.from({ length: 200 }, () => {
      const user = new User();
      user.name = faker.person.fullName();
      user.email = faker.internet.email();
      user.passwordHash = '$2a$10$X7J3Q5v8Y5Z9A0B1C2D3E4F5G6H7I8J9K0L1M2N3O4P5Q6R7S8T9U0V1W2X3Y4Z'; // Default test password hash
      return user;
    });
    await userRepository.save(users);
    console.log('Generated 200 users');

    // Generate teams
    console.log('Generating teams...');
    const teams = Array.from({ length: 100 }, () => {
      const team = new Team();
      team.name = faker.company.name();
      team.description = faker.lorem.sentence();
      team.createdBy = faker.helpers.arrayElement(users).id;
      return team;
    });
    await teamRepository.save(teams);
    console.log('Generated 100 teams');

    // Add users to teams
    console.log('Adding users to teams...');
    for (const team of teams) {
      const membersCount = faker.number.int({ min: 7, max: 15 });
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
    const fields = Array.from({ length: 50 }, (_, index) => {
      const field = new Field();
      field.name = faker.company.name() + ' Field';
      field.location = index < 20 ? 'Kyiv' : faker.location.city(); // First 20 fields in Kyiv
      field.capacity = faker.number.int({ min: 10, max: 22 });
      field.description = faker.lorem.sentence();
      field.pricePerHour = faker.number.int({ min: 50, max: 200 });
      field.imageUrl = `/assets/images/${(index % 10) + 1}.jpg`; // Cycle through images 1-10
      return field;
    });
    await fieldRepository.save(fields);
    console.log('Generated 50 fields');

    // Generate field schedules
    console.log('Generating field schedules...');
    for (const field of fields) {
      const schedules = Array.from({ length: 30 }, (_, i) => { // Generate schedules for next 30 days
        const schedule = new FieldSchedule();
        schedule.field = field;
        schedule.date = new Date(Date.now() + i * 24 * 60 * 60 * 1000);
        
        const startTime = new Date(schedule.date);
        startTime.setHours(8, 0, 0, 0); // Start earlier at 8 AM
        schedule.startTime = startTime.toISOString();
        
        const endTime = new Date(schedule.date);
        endTime.setHours(22, 0, 0, 0); // End later at 10 PM
        schedule.endTime = endTime.toISOString();
        
        schedule.status = 'available';
        return schedule;
      });
      await fieldScheduleRepository.save(schedules);
    }
    console.log('Generated field schedules');

    // Generate games
    console.log('Generating games...');
    const kyivFields = fields.filter(f => f.location === 'Kyiv');
    const games = Array.from({ length: 1000 }, (_, i) => {
      const game = new Game();
      game.field = i < 400 ? faker.helpers.arrayElement(kyivFields) : faker.helpers.arrayElement(fields); // 40% of games in Kyiv
      
      // Ensure teams are different
      game.teamA = faker.helpers.arrayElement(teams);
      do {
        game.teamB = faker.helpers.arrayElement(teams);
      } while (game.teamB.id === game.teamA.id);
      
      // Create games spread across next 4 weeks
      const today = new Date();
      game.date = new Date(today);
      game.date.setDate(today.getDate() + faker.number.int({ min: 0, max: 28 })); // Random day in next 4 weeks
      
      // Set game time between 8 AM and 10 PM with duration between 1.5 and 2.5 hours
      const startHour = faker.number.int({ min: 8, max: 20 }); // Latest start at 8 PM to ensure end before 10 PM
      game.startTime = new Date(game.date);
      game.startTime.setHours(startHour, faker.helpers.arrayElement([0, 30]), 0, 0);
      
      game.endTime = new Date(game.startTime);
      const durationInMinutes = faker.number.int({ min: 90, max: 150 }); // 1.5 to 2.5 hours
      game.endTime.setMinutes(game.endTime.getMinutes() + durationInMinutes);
      
      game.status = faker.helpers.arrayElement(['scheduled', 'in_progress', 'completed']);
      
      if (game.status === 'completed') {
        game.score = {
          teamA: faker.number.int({ min: 0, max: 7 }),
          teamB: faker.number.int({ min: 0, max: 7 })
        };
      }
      return game;
    });
    await gameRepository.save(games);
    console.log('Generated 1000 games');

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