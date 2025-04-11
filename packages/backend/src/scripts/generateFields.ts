import { createDatabaseConnection } from '../config/typeorm';
import { User } from '../entities/User';
import { Field } from '../entities/Field';
import { faker } from '@faker-js/faker';

async function generateFields() {
  const dataSource = await createDatabaseConnection();
  
  // Drop all tables and recreate them
  try {
    await dataSource.dropDatabase();
    await dataSource.synchronize();
  } catch (error) {
    console.error('Error dropping database:', error);
    process.exit(1);
  }

  const userRepository = dataSource.getRepository(User);
  const fieldRepository = dataSource.getRepository(Field);

  // Create field managers if they don't exist
  const managers = await Promise.all(
    Array.from({ length: 10 }, async (_, i) => {
      const manager = userRepository.create({
        email: `manager${i + 1}@example.com`,
        name: faker.person.fullName(),
        password: 'password123', // In production, this should be hashed
        role: 'field_manager'
      });
      return userRepository.save(manager);
    })
  );

  // Districts in Kyiv
  const districts = [
    'Голосіївський',
    'Дарницький',
    'Деснянський',
    'Дніпровський',
    'Оболонський',
    'Печерський',
    'Подільський',
    'Святошинський',
    'Солом\'янський',
    'Шевченківський'
  ];

  // Generate 50 fields
  const fields = await Promise.all(
    Array.from({ length: 50 }, async (_, i) => {
      const manager = managers[i % managers.length];
      const district = districts[Math.floor(Math.random() * districts.length)];
      
      // Generate realistic coordinates for Kyiv
      const kyivCenter = {
        lat: 50.4501,
        lng: 30.5234
      };
      
      const lat = kyivCenter.lat + (Math.random() - 0.5) * 0.1; // ±0.05 degrees from center
      const lng = kyivCenter.lng + (Math.random() - 0.5) * 0.1;

      const field = fieldRepository.create({
        name: `${faker.company.name()} Field`,
        cover: Math.random() > 0.5 ? 'yes' : 'no',
        numberOfSeats: Math.floor(Math.random() * 100) + 20,
        priceFrom: Math.floor(Math.random() * 500) + 500,
        priceTo: Math.floor(Math.random() * 1000) + 1000,
        managerPhone: faker.phone.number(),
        description: faker.lorem.paragraph(),
        googleMapsLink: `https://maps.google.com/?q=${lat},${lng}`,
        latitude: lat,
        longitude: lng,
        maxPlayersCount: Math.floor(Math.random() * 12) + 10, // 10-22 players
        lengthMeters: Math.floor(Math.random() * 20) + 90, // 90-110 meters
        widthMeters: Math.floor(Math.random() * 10) + 45, // 45-55 meters
        address: faker.location.streetAddress(),
        district: district,
        imageUrl: `https://picsum.photos/seed/${i}/800/600`,
        manager: manager
      });

      return fieldRepository.save(field);
    })
  );

  console.log(`Generated ${fields.length} fields`);
  process.exit(0);
}

generateFields().catch(console.error); 