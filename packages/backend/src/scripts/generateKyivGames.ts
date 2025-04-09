import { createDatabaseConnection } from '../config/typeorm';
import { User } from '../entities/User';
import { Team } from '../entities/Team';
import { TeamMember } from '../entities/TeamMember';
import { Field } from '../entities/Field';
import { FieldSchedule } from '../entities/FieldSchedule';
import { Game } from '../entities/Game';
import { faker } from '@faker-js/faker';

async function generateKyivGames() {
  console.log('Starting Kyiv games data generation...');
  
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

    // Clean up existing games and schedules
    console.log('Cleaning up existing games and schedules...');
    await gameRepository.delete({});
    await fieldScheduleRepository.delete({});
    console.log('Existing games and schedules cleaned up');

    // Create Kyiv fields if they don't exist
    console.log('Creating Kyiv fields...');
    const kyivFields = [
      {
        name: 'Olympic Stadium',
        location: 'Kyiv',
        capacity: 22,
        description: 'Professional football field in the heart of Kyiv',
        pricePerHour: 150
      },
      {
        name: 'Dynamo Stadium',
        location: 'Kyiv',
        capacity: 16,
        description: 'Historic football field with great atmosphere',
        pricePerHour: 120
      },
      {
        name: 'NSC Olimpiyskiy',
        location: 'Kyiv',
        capacity: 20,
        description: 'Modern sports complex with excellent facilities',
        pricePerHour: 130
      }
    ];

    const fields = await Promise.all(kyivFields.map(async fieldData => {
      let field = await fieldRepository.findOne({ where: { name: fieldData.name } });
      if (!field) {
        field = fieldRepository.create(fieldData);
        await fieldRepository.save(field);
      }
      return field;
    }));
    console.log('Kyiv fields created/updated');

    // Create teams if they don't exist
    console.log('Creating teams...');
    const teamNames = [
      'FC Dynamo Kyiv',
      'FC Shakhtar',
      'FC Dnipro',
      'FC Zorya',
      'FC Vorskla',
      'FC Kolos',
      'FC Rukh',
      'FC Minai'
    ];

    const teams = await Promise.all(teamNames.map(async name => {
      let team = await teamRepository.findOne({ where: { name } });
      if (!team) {
        team = teamRepository.create({
          name,
          description: `${name} football team`,
          createdBy: 'system'
        });
        await teamRepository.save(team);
      }
      return team;
    }));
    console.log('Teams created/updated');

    // Generate games for today and tomorrow
    console.log('Generating games...');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const gameTimes = [
      { start: 10, end: 12 },
      { start: 14, end: 16 },
      { start: 18, end: 20 }
    ];

    const games = [];

    // Generate games for today
    for (const field of fields) {
      for (const time of gameTimes) {
        const game = new Game();
        game.field = field;
        game.teamA = faker.helpers.arrayElement(teams);
        game.teamB = faker.helpers.arrayElement(teams.filter(t => t.id !== game.teamA.id));
        game.date = new Date(today);
        game.startTime = new Date(today);
        game.startTime.setHours(time.start, 0, 0, 0);
        game.endTime = new Date(today);
        game.endTime.setHours(time.end, 0, 0, 0);
        game.status = 'scheduled';
        games.push(game);
      }
    }

    // Generate games for tomorrow
    for (const field of fields) {
      for (const time of gameTimes) {
        const game = new Game();
        game.field = field;
        game.teamA = faker.helpers.arrayElement(teams);
        game.teamB = faker.helpers.arrayElement(teams.filter(t => t.id !== game.teamA.id));
        game.date = new Date(tomorrow);
        game.startTime = new Date(tomorrow);
        game.startTime.setHours(time.start, 0, 0, 0);
        game.endTime = new Date(tomorrow);
        game.endTime.setHours(time.end, 0, 0, 0);
        game.status = 'scheduled';
        games.push(game);
      }
    }

    await gameRepository.save(games);
    console.log('Generated games for today and tomorrow');

    console.log('Kyiv games data generation completed successfully!');
  } catch (error) {
    console.error('Error generating Kyiv games data:', error);
    throw error;
  }
}

// Run the script
generateKyivGames().catch(console.error); 