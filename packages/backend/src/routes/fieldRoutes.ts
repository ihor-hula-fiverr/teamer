import { Router } from 'express';
import { createDatabaseConnection } from '../config/typeorm';
import { Field } from '../entities/Field';
import { FieldSchedule } from '../entities/FieldSchedule';
import { User } from '../entities/User';
import asyncHandler from 'express-async-handler';

const router = Router();
let fieldRepository: any;
let fieldScheduleRepository: any;
let userRepository: any;

// Initialize repositories when database connection is established
createDatabaseConnection().then(dataSource => {
  fieldRepository = dataSource.getRepository(Field);
  fieldScheduleRepository = dataSource.getRepository(FieldSchedule);
  userRepository = dataSource.getRepository(User);
});

// Get all fields
router.get('/', asyncHandler(async (req, res) => {
  const fields = await fieldRepository.find({
    relations: ['schedules', 'manager']
  });
  res.json(fields);
}));

// Get field by ID
router.get('/:id', asyncHandler(async (req, res) => {
  const field = await fieldRepository.findOne({
    where: { id: req.params.id },
    relations: ['schedules', 'manager']
  });
  
  if (!field) {
    res.status(404).json({ message: 'Field not found' });
    return;
  }
  res.json(field);
}));

// Create field
router.post('/', asyncHandler(async (req, res) => {
  const { 
    name, 
    location, 
    capacity, 
    description, 
    pricePerHour,
    address,
    maxPlayersCount,
    fieldSize,
    hasShower,
    hasCover,
    priceFrom,
    priceTo,
    managerId
  } = req.body;
  
  const manager = await userRepository.findOneBy({ id: managerId });
  if (!manager) {
    res.status(404).json({ message: 'Manager not found' });
    return;
  }

  if (manager.role !== 'field_manager') {
    res.status(403).json({ message: 'User must be a field manager' });
    return;
  }
  
  const field = fieldRepository.create({
    name,
    location,
    capacity,
    description,
    pricePerHour,
    address,
    maxPlayersCount,
    fieldSize,
    hasShower,
    hasCover,
    priceFrom,
    priceTo,
    manager
  });

  await fieldRepository.save(field);
  res.status(201).json(field);
}));

// Update field
router.put('/:id', asyncHandler(async (req, res) => {
  const { 
    name, 
    location, 
    capacity, 
    description, 
    pricePerHour,
    address,
    maxPlayersCount,
    fieldSize,
    hasShower,
    hasCover,
    priceFrom,
    priceTo,
    managerId
  } = req.body;
  
  const field = await fieldRepository.findOne({
    where: { id: req.params.id },
    relations: ['manager']
  });
  
  if (!field) {
    res.status(404).json({ message: 'Field not found' });
    return;
  }

  // Check if manager is being changed
  if (managerId && managerId !== field.manager.id) {
    const newManager = await userRepository.findOneBy({ id: managerId });
    if (!newManager) {
      res.status(404).json({ message: 'New manager not found' });
      return;
    }
    if (newManager.role !== 'field_manager') {
      res.status(403).json({ message: 'New manager must be a field manager' });
      return;
    }
    field.manager = newManager;
  }

  field.name = name;
  field.location = location;
  field.capacity = capacity;
  field.description = description;
  field.pricePerHour = pricePerHour;
  field.address = address;
  field.maxPlayersCount = maxPlayersCount;
  field.fieldSize = fieldSize;
  field.hasShower = hasShower;
  field.hasCover = hasCover;
  field.priceFrom = priceFrom;
  field.priceTo = priceTo;

  await fieldRepository.save(field);
  res.json(field);
}));

// Delete field
router.delete('/:id', asyncHandler(async (req, res) => {
  const result = await fieldRepository.delete(req.params.id);
  if (result.affected === 0) {
    res.status(404).json({ message: 'Field not found' });
    return;
  }
  res.status(204).send();
}));

// Get fields by manager
router.get('/manager/:managerId', asyncHandler(async (req, res) => {
  const fields = await fieldRepository.find({
    where: { manager: { id: req.params.managerId } },
    relations: ['schedules']
  });
  res.json(fields);
}));

// Get field schedule
router.get('/:id/schedule', asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;
  
  const schedules = await fieldScheduleRepository.find({
    where: {
      field: { id: req.params.id },
      startTime: startDate ? new Date(startDate as string) : undefined,
      endTime: endDate ? new Date(endDate as string) : undefined
    },
    relations: ['field']
  });

  res.json(schedules);
}));

// Create field schedule
router.post('/:id/schedule', asyncHandler(async (req, res) => {
  const { startTime, endTime, status } = req.body;
  const field = await fieldRepository.findOneBy({ id: req.params.id });
  
  if (!field) {
    res.status(404).json({ message: 'Field not found' });
    return;
  }

  const schedule = fieldScheduleRepository.create({
    field,
    startTime: new Date(startTime),
    endTime: new Date(endTime),
    status
  });

  await fieldScheduleRepository.save(schedule);
  res.status(201).json(schedule);
}));

// Add schedule to field
router.post('/:id/schedules', asyncHandler(async (req, res) => {
  const { startTime, endTime, price } = req.body;
  const field = await fieldRepository.findOne({
    where: { id: req.params.id }
  });
  if (!field) {
    res.status(404).json({ message: 'Field not found' });
    return;
  }
  const schedule = fieldScheduleRepository.create({
    field,
    startTime,
    endTime,
    price
  });
  await fieldScheduleRepository.save(schedule);
  res.status(201).json(schedule);
}));

// Remove schedule from field
router.delete('/:id/schedules/:scheduleId', asyncHandler(async (req, res) => {
  const schedule = await fieldScheduleRepository.findOne({
    where: {
      fieldId: req.params.id,
      id: req.params.scheduleId
    }
  });
  if (!schedule) {
    res.status(404).json({ message: 'Schedule not found' });
    return;
  }
  await fieldScheduleRepository.remove(schedule);
  res.status(204).send();
}));

router.get('/', async (req, res) => {
  res.json({ message: 'Field routes working' });
});

export default router; 