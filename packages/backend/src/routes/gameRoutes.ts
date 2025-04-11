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
        district: game.field.district,
        address: game.field.address,
        maxPlayersCount: game.field.maxPlayersCount,
        priceFrom: game.field.priceFrom,
        priceTo: game.field.priceTo,
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
    const searchDate = date ? new Date(date as string).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];

    if (!city || typeof city !== 'string') {
      return res.status(400).json({ message: 'City parameter is required and must be a string' });
    }

    // Find fields in the specified city
    const fields = await fieldRepository.find({
      where: {
        district: city
      }
    });

    if (fields.length === 0) {
      return res.json([]);
    }

    const fieldIds = fields.map(field => field.id);

    // Find games for these fields on the specified date
    const games = await gameRepository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.field', 'field')
      .leftJoinAndSelect('game.teamA', 'teamA')
      .leftJoinAndSelect('game.teamB', 'teamB')
      .where('field.id IN (:...fieldIds)', { fieldIds })
      .andWhere('game._date = :searchDate', { searchDate: searchDate.split('T')[0] })
      .andWhere('game.status = :status', { status: 'scheduled' })
      .orderBy('game.startTime', 'ASC')
      .getMany();

    // Format the response
    const formattedGames = games.map(game => ({
      id: game.id,
      field: {
        id: game.field.id,
        name: game.field.name,
        cover: game.field.cover,
        numberOfSeats: game.field.numberOfSeats,
        priceFrom: game.field.priceFrom,
        priceTo: game.field.priceTo,
        managerPhone: game.field.managerPhone,
        description: game.field.description,
        googleMapsLink: game.field.googleMapsLink,
        latitude: game.field.latitude,
        longitude: game.field.longitude,
        maxPlayersCount: game.field.maxPlayersCount,
        lengthMeters: game.field.lengthMeters,
        widthMeters: game.field.widthMeters,
        address: game.field.address,
        district: game.field.district,
        imageUrl: game.field.imageUrl,
        managerId: game.field.managerId,
        schedules: game.field.schedules
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