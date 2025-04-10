import { createDatabaseConnection } from '../config/typeorm';
import { User } from '../entities/User';
import { Field } from '../entities/Field';
import { Team } from '../entities/Team';
import { TeamMember } from '../entities/TeamMember';
import { Game } from '../entities/Game';
import { FieldSchedule } from '../entities/FieldSchedule';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcryptjs';

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

  // Create users (200 users to have enough for teams)
  const users = await Promise.all(
    Array.from({ length: 200 }, async (_, i) => {
      const user = userRepository.create({
        email: `user${i + 1}@example.com`,
        name: faker.person.fullName(),
        password: await bcrypt.hash('password123', 10),
      });
      return userRepository.save(user);
    })
  );

  // Create fields (50 fields)
  const cities = ['Kyiv', 'Lviv', 'Odesa', 'Kharkiv', 'Dnipro'];
  const fields = await Promise.all(
    Array.from({ length: 50 }, async (_, i) => {
      const field = fieldRepository.create({
        name: `${faker.company.name()} Field`,
        location: cities[Math.floor(Math.random() * cities.length)],
        capacity: Math.floor(Math.random() * 20) + 10,
        description: faker.lorem.sentence(),
        pricePerHour: Math.floor(Math.random() * 500) + 300,
        address: faker.location.streetAddress(),
        maxPlayersCount: Math.floor(Math.random() * 10) + 10,
        fieldSize: `${Math.floor(Math.random() * 20) + 30}x${Math.floor(Math.random() * 20) + 40}`,
        hasShower: Math.random() > 0.3,
        hasCover: Math.random() > 0.5,
      });
      return fieldRepository.save(field);
    })
  );

  // Create teams (100 teams)
  const teams = await Promise.all(
    Array.from({ length: 100 }, async (_, i) => {
      const team = teamRepository.create({
        name: `${faker.company.name()} FC`,
        description: faker.lorem.paragraph(),
        createdBy: users[i % users.length].id
      });
      return teamRepository.save(team);
    })
  );

  // Add members to teams
  for (const team of teams) {
    const numMembers = Math.floor(Math.random() * 10) + 10; // 10-20 members per team
    const shuffledUsers = [...users].sort(() => Math.random() - 0.5);
    const teamMembers = shuffledUsers.slice(0, numMembers);

    await Promise.all(
      teamMembers.map(async (user, index) => {
        const teamMember = teamMemberRepository.create({
          team,
          user,
          role: index < 2 ? 'admin' : 'member', // First two members are admins
        });
        return teamMemberRepository.save(teamMember);
      })
    );
  }

  // Create games (1000 games over next 2 weeks)
  const twoWeeksFromNow = new Date();
  twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);

  const games = await Promise.all(
    Array.from({ length: 1000 }, async () => {
      const teamA = teams[Math.floor(Math.random() * teams.length)];
      let teamB;
      do {
        teamB = teams[Math.floor(Math.random() * teams.length)];
      } while (teamB.id === teamA.id);

      const field = fields[Math.floor(Math.random() * fields.length)];
      const date = new Date();
      date.setDate(date.getDate() + Math.floor(Math.random() * 14)); // Games in next 14 days
      const startTime = new Date(date);
      startTime.setHours(6 + Math.floor(Math.random() * 16), 0, 0, 0); // Between 6 AM and 10 PM
      const endTime = new Date(startTime);
      endTime.setHours(startTime.getHours() + 2); // 2-hour games

      const game = gameRepository.create({
        field,
        teamA,
        teamB,
        date,
        startTime,
        endTime,
        status: date < new Date() ? 'completed' : 'scheduled',
        score: date < new Date() ? { teamA: Math.floor(Math.random() * 5), teamB: Math.floor(Math.random() * 5) } : undefined,
      });
      return gameRepository.save(game);
    })
  );

  // Create field schedules for next 2 weeks
  const schedules = await Promise.all(
    fields.flatMap((field) =>
      Array.from({ length: 14 }, async (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        const startTime = new Date(date);
        startTime.setHours(6, 0, 0, 0); // Open from 6 AM
        const endTime = new Date(date);
        endTime.setHours(22, 0, 0, 0); // Close at 10 PM

        const schedule = fieldScheduleRepository.create({
          fieldId: field.id,
          date,
          _startTime: startTime,
          _endTime: endTime,
          status: 'available',
        });
        return fieldScheduleRepository.save(schedule);
      })
    )
  );

  console.log('Test data generated successfully!');
  console.log(`Created ${users.length} users`);
  console.log(`Created ${fields.length} fields`);
  console.log(`Created ${teams.length} teams`);
  console.log(`Created ${games.length} games`);
  console.log(`Created ${schedules.length} field schedules`);

  await dataSource.destroy();
}

// Run the script
generateTestData().catch((error) => {
  console.error('Error generating test data:', error);
  process.exit(1);
}); 