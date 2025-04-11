import { createDatabaseConnection } from './config/typeorm';
import { DataSource } from 'typeorm';
import { Field } from './entities/Field';
import { Team } from './entities/Team';
import { Game } from './entities/Game';
import { User } from './entities/User';
import { FieldSchedule } from './entities/FieldSchedule';
import { faker } from '@faker-js/faker';
import { addDays, setHours, setMinutes } from 'date-fns';

const DISTRICTS = ['Kyiv', 'Lviv', 'Kharkiv', 'Odesa', 'Dnipro'];
const FIELD_TYPES = ['indoor', 'outdoor'];
const TEAM_NAMES = [
  'Dynamo', 'Shakhtar', 'Zorya', 'Vorskla', 'Dnipro-1',
  'Kolos', 'Rukh', 'Metalist', 'Chornomorets', 'Minai'
];

async function seed() {
  const dataSource = await createDatabaseConnection();
  
  try {
    // Clear existing data
    await dataSource.getRepository(Game).delete({});
    await dataSource.getRepository(FieldSchedule).delete({});
    await dataSource.getRepository(Field).delete({});
    await dataSource.getRepository(Team).delete({});
    await dataSource.getRepository(User).delete({});

    // Create admin user
    const admin = dataSource.getRepository(User).create({
      email: 'admin@teamer.com',
      name: 'Admin User',
      role: 'field_manager'
    });
    await dataSource.getRepository(User).save(admin);

    // Create 50 fields
    const fields = [];
    for (let i = 0; i < 50; i++) {
      const field = dataSource.getRepository(Field).create({
        name: `${faker.company.name()} Field`,
        cover: faker.image.urlLoremFlickr({ category: 'sports' }),
        numberOfSeats: faker.number.int({ min: 5, max: 20 }),
        priceFrom: faker.number.int({ min: 500, max: 1000 }),
        priceTo: faker.number.int({ min: 1000, max: 2000 }),
        managerPhone: faker.phone.number(),
        description: faker.lorem.paragraph(),
        googleMapsLink: faker.internet.url(),
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
        maxPlayersCount: faker.number.int({ min: 5, max: 10 }),
        lengthMeters: faker.number.int({ min: 20, max: 40 }),
        widthMeters: faker.number.int({ min: 10, max: 20 }),
        address: faker.location.streetAddress(),
        district: faker.helpers.arrayElement(DISTRICTS),
        imageUrl: faker.image.urlLoremFlickr({ category: 'sports' }),
        managerId: admin.id
      });
      fields.push(await dataSource.getRepository(Field).save(field));
    }

    // Create 100 teams
    const teams = [];
    for (let i = 0; i < 100; i++) {
      const team = dataSource.getRepository(Team).create({
        name: `${faker.helpers.arrayElement(TEAM_NAMES)} ${faker.number.int({ min: 1, max: 99 })}`,
        description: faker.lorem.sentence(),
        createdBy: admin.id
      });
      teams.push(await dataSource.getRepository(Team).save(team));
    }

    // Create 1000 games over the next 2 weeks
    const games = [];
    const startDate = new Date();
    const endDate = addDays(startDate, 14);

    for (let i = 0; i < 1000; i++) {
      const field = faker.helpers.arrayElement(fields);
      const teamA = faker.helpers.arrayElement(teams);
      let teamB = faker.helpers.arrayElement(teams);
      while (teamB.id === teamA.id) {
        teamB = faker.helpers.arrayElement(teams);
      }

      const gameDate = faker.date.between({ from: startDate, to: endDate });
      const startTime = setMinutes(setHours(gameDate, faker.number.int({ min: 8, max: 20 })), 0);
      const endTime = setMinutes(setHours(startTime, faker.number.int({ min: 1, max: 2 })), 0);

      const game = dataSource.getRepository(Game).create({
        field,
        teamA,
        teamB,
        _date: gameDate.toISOString().split('T')[0],
        startTime,
        endTime,
        status: 'scheduled'
      });
      games.push(await dataSource.getRepository(Game).save(game));
    }

    console.log('Database seeded successfully!');
    console.log(`Created ${fields.length} fields`);
    console.log(`Created ${teams.length} teams`);
    console.log(`Created ${games.length} games`);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await dataSource.destroy();
  }
}

seed(); 