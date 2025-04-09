import { Router } from 'express';
import passport from 'passport';

const router = Router();

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect to home
    res.redirect('http://localhost:8080');
  }
);

// Get current session
router.get('/session', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

// Sign out
router.post('/signout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error signing out' });
    }
    res.json({ message: 'Signed out successfully' });
  });
});

export default router; 