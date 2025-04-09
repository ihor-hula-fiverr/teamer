import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables from .env file
dotenv.config();

// Define the schema for environment variables
const envSchema = z.object({
  // Google OAuth
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),

  // Session
  SESSION_SECRET: z.string().min(1),

  // Database
  DATABASE_URL: z.string().min(1),

  // Server
  PORT: z.string().transform(Number),
  NODE_ENV: z.enum(['development', 'production', 'test']),
});

// Validate and parse environment variables
const parseEnv = () => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Invalid environment variables:', error.errors);
      process.exit(1);
    }
    throw error;
  }
};

export const config = parseEnv(); 