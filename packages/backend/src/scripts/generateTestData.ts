import { createDatabaseConnection } from '../config/typeorm';
import { User } from '../entities/User';
import { Field } from '../entities/Field';
import { Team } from '../entities/Team';
import { TeamMember } from '../entities/TeamMember';
import { Game } from '../entities/Game';
import { FieldSchedule } from '../entities/FieldSchedule';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

async function generateTestData() {
  const dataSource = await createDatabaseConnection();
  const userRepository = dataSource.getRepository(User);
  const fieldRepository = dataSource.getRepository(Field);
  const teamRepository = dataSource.getRepository(Team);
  const teamMemberRepository = dataSource.getRepository(TeamMember);
  const gameRepository = dataSource.getRepository(Game);
  const fieldScheduleRepository = dataSource.getRepository(FieldSchedule);

  // Clear existing data
  await fieldScheduleRepository.delete({});
  await gameRepository.delete({});
  await teamMemberRepository.delete({});
  await teamRepository.delete({});
  await fieldRepository.delete({});
  await userRepository.delete({});

  // Generate users
  const users = [];
  const passwordHash = await bcrypt.hash('password123', 10);

  // Generate regular users
  for (let i = 0; i < 180; i++) {
    users.push(
      userRepository.create({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: passwordHash,
        role: 'user'
      })
    );
  }

  // Generate field managers
  for (let i = 0; i < 15; i++) {
    users.push(
      userRepository.create({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: passwordHash,
        role: 'field_manager'
      })
    );
  }

  // Generate game organizers
  for (let i = 0; i < 5; i++) {
    users.push(
      userRepository.create({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: passwordHash,
        role: 'game_organizer'
      })
    );
  }

  await userRepository.save(users);

  // Generate fields
  const fields = [];
  const fieldManagers = users.filter(user => user.role === 'field_manager');

  for (let i = 0; i < 50; i++) {
    const manager = faker.helpers.arrayElement(fieldManagers);
    const priceFrom = faker.number.float({ min: 20, max: 50, fractionDigits: 2 });
    const priceTo = faker.number.float({ min: priceFrom, max: 100, fractionDigits: 2 });

    fields.push(
      fieldRepository.create({
        name: faker.company.name() + ' Field',
        location: faker.location.city(),
        address: faker.location.streetAddress(),
        capacity: faker.number.int({ min: 10, max: 30 }),
        description: faker.lorem.paragraph(),
        pricePerHour: faker.number.float({ min: 20, max: 100, fractionDigits: 2 }),
        maxPlayersCount: faker.number.int({ min: 5, max: 20 }),
        fieldSize: `${faker.number.int({ min: 15, max: 30 })}m X ${faker.number.int({ min: 15, max: 30 })}m`,
        hasShower: faker.datatype.boolean(),
        hasCover: faker.datatype.boolean(),
        priceFrom,
        priceTo,
        manager,
        imageUrl: faker.image.urlLoremFlickr({ category: 'sports' })
      })
    );
  }

  await fieldRepository.save(fields);

  // Generate teams
  const teams = [];
  const regularUsers = users.filter(user => user.role === 'user');

  for (let i = 0; i < 100; i++) {
    const creator = faker.helpers.arrayElement(regularUsers);
    teams.push(
      teamRepository.create({
        name: faker.company.name() + ' FC',
        description: faker.lorem.sentence(),
        createdBy: creator.id
      })
    );
  }

  await teamRepository.save(teams);

  // Generate team members
  const teamMembers = [];
  for (const team of teams) {
    const memberCount = faker.number.int({ min: 5, max: 15 });
    const selectedUsers = faker.helpers.arrayElements(regularUsers, memberCount);

    for (const user of selectedUsers) {
      teamMembers.push(
        teamMemberRepository.create({
          team,
          user,
          role: user.id === team.createdBy ? 'admin' : 'member'
        })
      );
    }
  }

  await teamMemberRepository.save(teamMembers);

  // Generate games
  const games = [];
  const gameOrganizers = users.filter(user => user.role === 'game_organizer');

  for (let i = 0; i < 1000; i++) {
    const field = faker.helpers.arrayElement(fields);
    const teamA = faker.helpers.arrayElement(teams);
    let teamB;
    do {
      teamB = faker.helpers.arrayElement(teams);
    } while (teamB.id === teamA.id);

    const date = faker.date.future();
    const startTime = new Date(date);
    startTime.setHours(faker.number.int({ min: 8, max: 20 }));
    startTime.setMinutes(faker.helpers.arrayElement([0, 30]));

    const endTime = new Date(startTime);
    endTime.setHours(startTime.getHours() + faker.number.int({ min: 1, max: 3 }));

    games.push(
      gameRepository.create({
        field,
        teamA,
        teamB,
        date,
        startTime,
        endTime,
        status: faker.helpers.arrayElement(['scheduled', 'in_progress', 'completed', 'cancelled'])
      })
    );
  }

  await gameRepository.save(games);

  // Generate field schedules
  const schedules = [];
  for (const field of fields) {
    for (let i = 0; i < 30; i++) {
      const date = faker.date.future();
      const startTime = new Date(date);
      startTime.setHours(faker.number.int({ min: 8, max: 20 }));
      startTime.setMinutes(faker.helpers.arrayElement([0, 30]));

      const endTime = new Date(startTime);
      endTime.setHours(startTime.getHours() + faker.number.int({ min: 1, max: 3 }));

      schedules.push(
        fieldScheduleRepository.create({
          fieldId: field.id,
          date,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          status: faker.helpers.arrayElement(['available', 'booked', 'maintenance'])
        })
      );
    }
  }

  await fieldScheduleRepository.save(schedules);

  console.log('Test data generated successfully!');
  await dataSource.destroy();
}

generateTestData().catch(console.error); 