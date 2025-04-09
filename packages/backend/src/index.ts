import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import session from 'express-session';
import passport from 'passport';
import { createDatabaseConnection } from './config/typeorm';
import userRoutes from './routes/userRoutes';
import teamRoutes from './routes/teamRoutes';
import fieldRoutes from './routes/fieldRoutes';
import gameRoutes from './routes/gameRoutes';
import authRoutes from './routes/authRoutes';

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Teamer API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      teams: '/api/teams',
      fields: '/api/fields',
      games: '/api/games'
    }
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/fields', fieldRoutes);
app.use('/api/games', gameRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Initialize database connection
createDatabaseConnection()
  .then((connection) => {
    console.log('Database connection established');
    // Start server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
    process.exit(1);
  }); 