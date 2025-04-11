import { createDatabaseConnection } from '../config/typeorm';
import { Field } from '../entities/Field';
import { Game } from '../entities/Game';
import { Team } from '../entities/Team';
import { Connection } from 'typeorm';
import { addDays, parse } from 'date-fns';

async function initializeTestData() {
  let connection: Connection | undefined;
  try {
    // Initialize the database connection
    connection = await createDatabaseConnection();
    console.log('Database connection initialized');

    // Get existing teams
    const teamRepository = connection.getRepository(Team);
    const teams = await teamRepository.find();
    if (teams.length < 2) {
      throw new Error('Need at least 2 teams to create games');
    }

    // Create test fields
    const field1 = new Field();
    field1.name = 'Stadium Kyiv';
    field1.district = 'Kyiv';
    field1.address = '123 Main Street';
    field1.maxPlayersCount = 10;
    field1.lengthMeters = 100;
    field1.widthMeters = 60;
    field1.priceFrom = 1000;
    field1.priceTo = 2000;
    field1.numberOfSeats = 50;
    field1.latitude = 50.4501;
    field1.longitude = 30.5234;
    field1.imageUrl = '/assets/images/1.jpg';

    const field2 = new Field();
    field2.name = 'Football Arena';
    field2.district = 'Kyiv';
    field2.address = '456 Sports Avenue';
    field2.maxPlayersCount = 8;
    field2.lengthMeters = 90;
    field2.widthMeters = 50;
    field2.priceFrom = 800;
    field2.priceTo = 1500;
    field2.numberOfSeats = 30;
    field2.latitude = 50.4501;
    field2.longitude = 30.5234;
    field2.imageUrl = '/assets/images/2.jpg';

    // Save fields
    const savedFields = await connection.manager.save([field1, field2]);
    console.log('Test fields created');

    // Create test games
    const game1 = new Game();
    game1.field = savedFields[0];
    game1.teamA = teams[0];
    game1.teamB = teams[1];
    game1.date = addDays(new Date(), 1); // Tomorrow
    game1.startTime = parse('18:00', 'HH:mm', new Date());
    game1.endTime = parse('19:30', 'HH:mm', new Date());
    game1.status = 'scheduled';

    const game2 = new Game();
    game2.field = savedFields[1];
    game2.teamA = teams[0];
    game2.teamB = teams[1];
    game2.date = addDays(new Date(), 2); // Day after tomorrow
    game2.startTime = parse('19:00', 'HH:mm', new Date());
    game2.endTime = parse('20:30', 'HH:mm', new Date());
    game2.status = 'scheduled';

    // Save games
    await connection.manager.save([game1, game2]);
    console.log('Test games created');

    console.log('Test data initialization completed successfully');
  } catch (error) {
    console.error('Error during test data initialization:', error);
  } finally {
    // Close the database connection
    if (connection) {
      await connection.close();
    }
  }
}

// Run the initialization
initializeTestData(); 