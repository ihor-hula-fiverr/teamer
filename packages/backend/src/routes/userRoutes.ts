import { Router } from 'express';
import { createDatabaseConnection } from '../config/typeorm';
import { User } from '../entities/User';
import asyncHandler from 'express-async-handler';

const router = Router();
let userRepository: any;

// Initialize repository when database connection is established
createDatabaseConnection().then(dataSource => {
  userRepository = dataSource.getRepository(User);
});

// Get all users
router.get('/', asyncHandler(async (req, res) => {
  const users = await userRepository.find({
    select: ['id', 'email', 'name', 'role', 'createdAt']
  });
  res.json(users);
}));

// Get user by ID
router.get('/:id', asyncHandler(async (req, res) => {
  const user = await userRepository.findOne({
    where: { id: req.params.id },
    select: ['id', 'email', 'name', 'role', 'createdAt']
  });
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  res.json(user);
}));

// Create user
router.post('/', asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;
  
  // In a real app, you would hash the password here
  const user = userRepository.create({
    email,
    name,
    passwordHash: password, // Don't do this in production!
    role: 'user'
  });

  await userRepository.save(user);
  res.status(201).json({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    createdAt: user.createdAt
  });
}));

// Update user
router.put('/:id', asyncHandler(async (req, res) => {
  const { name, role } = req.body;
  const user = await userRepository.findOneBy({ id: req.params.id });
  
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  if (name) {
    user.name = name;
  }

  if (role && ['user', 'field_manager', 'game_organizer'].includes(role)) {
    user.role = role;
  }

  await userRepository.save(user);
  
  res.json({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    createdAt: user.createdAt
  });
}));

// Update user role
router.patch('/:id/role', asyncHandler(async (req, res) => {
  const { role } = req.body;
  const user = await userRepository.findOneBy({ id: req.params.id });
  
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  if (!['user', 'field_manager', 'game_organizer'].includes(role)) {
    res.status(400).json({ message: 'Invalid role' });
    return;
  }

  user.role = role;
  await userRepository.save(user);
  
  res.json({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    createdAt: user.createdAt
  });
}));

// Delete user
router.delete('/:id', asyncHandler(async (req, res) => {
  const result = await userRepository.delete(req.params.id);
  if (result.affected === 0) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  res.status(204).send();
}));

router.get('/', async (req, res) => {
  res.json({ message: 'User routes working' });
});

export default router; 