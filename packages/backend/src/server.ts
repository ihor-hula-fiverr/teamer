import 'reflect-metadata';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import { config } from './config';
import { createDatabaseConnection } from './config/typeorm';
import authRoutes from './routes/auth';
import './auth/passport';
import './scripts/generateTestData';

const app = express();

// Initialize TypeORM
createDatabaseConnection()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((error: Error) => {
    console.error('Error during Data Source initialization:', error);
  });

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// Session configuration
app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 