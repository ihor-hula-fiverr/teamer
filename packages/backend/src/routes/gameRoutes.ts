import { Router } from 'express';
import { Between, In, MoreThanOrEqual } from 'typeorm';
import { createDatabaseConnection } from '../config/typeorm';
import { Game } from '../entities/Game';
import { Field } from '../entities/Field';
import { startOfDay, endOfDay } from 'date-fns';
import { Repository } from 'typeorm';

const router = Router();
let gameRepository: Repository<Game>;
let fieldRepository: Repository<Field>;

// Initialize repositories
createDatabaseConnection().then(dataSource => {
  gameRepository = dataSource.getRepository(Game);
  fieldRepository = dataSource.getRepository(Field);
});

// Get all games starting from today
router.get('/', async (req, res) => {
  try {
    const today = startOfDay(new Date());
    
    // Find all games starting from today
    const games = await gameRepository.find({
      where: {
        date: MoreThanOrEqual(today),
        status: 'scheduled'
      },
      relations: ['field', 'teamA', 'teamB'],
      order: {
        date: 'ASC',
        startTime: 'ASC'
      }
    });

    // Format the response
    const formattedGames = games.map(game => ({
      id: game.id,
      field: {
        id: game.field.id,
        name: game.field.name,
        location: game.field.location,
        capacity: game.field.capacity,
        pricePerHour: game.field.pricePerHour,
        imageUrl: game.field.imageUrl || `/assets/images/fields/${game.field.id}.jpg`
      },
      teamA: {
        id: game.teamA.id,
        name: game.teamA.name
      },
      teamB: {
        id: game.teamB.id,
        name: game.teamB.name
      },
      date: game.date,
      startTime: game.startTime,
      endTime: game.endTime,
      status: game.status
    }));

    res.json(formattedGames);
  } catch (error) {
    console.error('Get games error:', error);
    res.status(500).json({ message: 'Error fetching games' });
  }
});

// Search games by date and location
router.get('/search', async (req, res) => {
  try {
    const { date, city } = req.query;
    const searchDate = date ? new Date(date as string) : new Date();

    // Find fields in the specified city
    const fields = await fieldRepository.find({
      where: {
        location: city as string
      }
    });

    const fieldIds = fields.map((field: Field) => field.id);

    // Find games for these fields on the specified date
    const games = await gameRepository.find({
      where: {
        field: {
          id: In(fieldIds)
        },
        date: Between(
          startOfDay(searchDate),
          endOfDay(searchDate)
        ),
        status: 'scheduled'
      },
      relations: ['field', 'teamA', 'teamB']
    });

    // Format the response
    const formattedGames = games.map(game => ({
      id: game.id,
      field: {
        id: game.field.id,
        name: game.field.name,
        location: game.field.location,
        capacity: game.field.capacity,
        pricePerHour: game.field.pricePerHour,
        imageUrl: game.field.imageUrl || `/assets/images/fields/${game.field.id}.jpg`
      },
      teamA: {
        id: game.teamA.id,
        name: game.teamA.name
      },
      teamB: {
        id: game.teamB.id,
        name: game.teamB.name
      },
      date: game.date,
      startTime: game.startTime,
      endTime: game.endTime,
      status: game.status
    }));

    res.json(formattedGames);
  } catch (error) {
    console.error('Search games error:', error);
    res.status(500).json({ message: 'Error searching games' });
  }
});

export default router; 