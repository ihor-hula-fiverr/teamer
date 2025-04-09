export const config = {
  PORT: process.env.PORT || 8080,
  SESSION_SECRET: process.env.SESSION_SECRET || 'your-secret-key',
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
}; 