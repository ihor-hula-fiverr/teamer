import { createDatabaseConnection } from '../config/typeorm';
import { Team } from '../entities/Team';
import { TeamMember } from '../entities/TeamMember';
import { User } from '../entities/User';
import { Connection } from 'typeorm';

async function initializeDatabase() {
  let connection: Connection | undefined;
  try {
    // Initialize the database connection
    connection = await createDatabaseConnection();
    console.log('Database connection initialized');

    // Create test users
    const user1 = new User();
    user1.email = 'user1@example.com';
    user1.name = 'User One';
    user1.passwordHash = 'dummy_hash_1'; // In a real app, this would be properly hashed

    const user2 = new User();
    user2.email = 'user2@example.com';
    user2.name = 'User Two';
    user2.passwordHash = 'dummy_hash_2'; // In a real app, this would be properly hashed

    // Save users
    const savedUsers = await connection.manager.save([user1, user2]);
    console.log('Test users created');

    // Create some test teams
    const team1 = new Team();
    team1.name = 'FC Barcelona';
    team1.description = 'A professional football team based in Barcelona';
    team1.createdBy = 'system';

    const team2 = new Team();
    team2.name = 'Real Madrid';
    team2.description = 'A professional football team based in Madrid';
    team2.createdBy = 'system';

    // Save teams
    const savedTeams = await connection.manager.save([team1, team2]);
    console.log('Test teams created');

    // Create team members
    const member1 = new TeamMember();
    member1.team = savedTeams[0];
    member1.user = savedUsers[0];
    member1.role = 'admin';

    const member2 = new TeamMember();
    member2.team = savedTeams[1];
    member2.user = savedUsers[1];
    member2.role = 'admin';

    // Save team members
    await connection.manager.save([member1, member2]);
    console.log('Test team members created');

    console.log('Database initialization completed successfully');
  } catch (error) {
    console.error('Error during database initialization:', error);
  } finally {
    // Close the database connection
    if (connection) {
      await connection.close();
    }
  }
}

// Run the initialization
initializeDatabase(); 