import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  res.json({ message: 'Game routes working' });
});

export default router; 