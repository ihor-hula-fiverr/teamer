import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createDatabaseConnection } from './config/typeorm';
import userRoutes from './routes/userRoutes';
import teamRoutes from './routes/teamRoutes';
import fieldRoutes from './routes/fieldRoutes';
import gameRoutes from './routes/gameRoutes';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Teamer API',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      teams: '/api/teams',
      fields: '/api/fields',
      games: '/api/games'
    }
  });
});

// Routes
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