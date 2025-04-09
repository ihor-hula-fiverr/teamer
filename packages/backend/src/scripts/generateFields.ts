import { createDatabaseConnection } from '../config/typeorm';
import { Field } from '../entities/Field';
import { Game } from '../entities/Game';
import { faker } from '@faker-js/faker';

async function generateFields() {
  try {
    const dataSource = await createDatabaseConnection();
    console.log('Database connection established');

    const fieldRepository = dataSource.getRepository(Field);
    const gameRepository = dataSource.getRepository(Game);

    // Delete all games first to avoid foreign key constraint
    console.log('Deleting existing games...');
    await gameRepository.delete({});

    // Delete all existing fields
    console.log('Deleting existing fields...');
    await fieldRepository.delete({});

    // Generate new fields
    console.log('Generating new fields...');
    const fields = Array.from({ length: 10 }, () => {
      return fieldRepository.create({
        name: `${faker.company.name()} Sports Field`,
        location: `${faker.location.city()}, ${faker.location.streetAddress()}`,
        capacity: faker.number.int({ min: 5, max: 20 }),
        description: faker.lorem.paragraph(),
        pricePerHour: faker.number.float({ min: 50, max: 500, fractionDigits: 2 })
      });
    });

    await fieldRepository.save(fields);
    console.log('Fields generated successfully');

    await dataSource.destroy();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error generating fields:', error);
    process.exit(1);
  }
}

generateFields(); 