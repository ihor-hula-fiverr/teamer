import { Router } from 'express';
import { createDatabaseConnection } from '../config/typeorm';
import { Team } from '../entities/Team';
import { TeamMember } from '../entities/TeamMember';
import asyncHandler from 'express-async-handler';

const router = Router();
let teamRepository: any;
let teamMemberRepository: any;

// Initialize repositories when database connection is established
createDatabaseConnection().then(dataSource => {
  teamRepository = dataSource.getRepository(Team);
  teamMemberRepository = dataSource.getRepository(TeamMember);
});

// Get all teams
router.get('/', asyncHandler(async (req, res) => {
  const teams = await teamRepository.find({
    relations: ['members', 'members.user']
  });
  res.json(teams);
}));

// Get team by ID
router.get('/:id', asyncHandler(async (req, res) => {
  const team = await teamRepository.findOne({
    where: { id: req.params.id },
    relations: ['members', 'members.user']
  });
  if (!team) {
    res.status(404).json({ message: 'Team not found' });
    return;
  }
  res.json(team);
}));

// Create team
router.post('/', asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const team = teamRepository.create({
    name,
    description
  });
  await teamRepository.save(team);
  res.status(201).json(team);
}));

// Add member to team
router.post('/:id/members', asyncHandler(async (req, res) => {
  const { userId, role } = req.body;
  const team = await teamRepository.findOne({
    where: { id: req.params.id }
  });
  if (!team) {
    res.status(404).json({ message: 'Team not found' });
    return;
  }
  const member = teamMemberRepository.create({
    team,
    userId,
    role
  });
  await teamMemberRepository.save(member);
  res.status(201).json(member);
}));

// Remove member from team
router.delete('/:id/members/:userId', asyncHandler(async (req, res) => {
  const member: TeamMember | null = await teamMemberRepository.findOne({
    where: {
      teamId: req.params.id,
      userId: req.params.userId
    }
  });
  if (!member) {
    res.status(404).json({ message: 'Member not found' });
    return;
  }
  await teamMemberRepository.remove(member);
  res.status(204).send();
}));

export default router; 