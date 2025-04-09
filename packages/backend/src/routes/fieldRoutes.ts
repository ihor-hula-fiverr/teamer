import { Router } from 'express';
import { createDatabaseConnection } from '../config/typeorm';
import { Field } from '../entities/Field';
import { FieldSchedule } from '../entities/FieldSchedule';
import asyncHandler from 'express-async-handler';

const router = Router();
let fieldRepository: any;
let fieldScheduleRepository: any;

// Initialize repositories when database connection is established
createDatabaseConnection().then(dataSource => {
  fieldRepository = dataSource.getRepository(Field);
  fieldScheduleRepository = dataSource.getRepository(FieldSchedule);
});

// Get all fields
router.get('/', asyncHandler(async (req, res) => {
  const fields = await fieldRepository.find({
    relations: ['schedules']
  });
  res.json(fields);
}));

// Get field by ID
router.get('/:id', asyncHandler(async (req, res) => {
  const field = await fieldRepository.findOne({
    where: { id: req.params.id },
    relations: ['schedules']
  });
  
  if (!field) {
    res.status(404).json({ message: 'Field not found' });
    return;
  }
  res.json(field);
}));

// Create field
router.post('/', asyncHandler(async (req, res) => {
  const { name, location, capacity, description, pricePerHour } = req.body;
  
  const field = fieldRepository.create({
    name,
    location,
    capacity,
    description,
    pricePerHour
  });

  await fieldRepository.save(field);
  res.status(201).json(field);
}));

// Update field
router.put('/:id', asyncHandler(async (req, res) => {
  const { name, location, capacity, description, pricePerHour } = req.body;
  const field = await fieldRepository.findOneBy({ id: req.params.id });
  
  if (!field) {
    res.status(404).json({ message: 'Field not found' });
    return;
  }

  field.name = name;
  field.location = location;
  field.capacity = capacity;
  field.description = description;
  field.pricePerHour = pricePerHour;

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