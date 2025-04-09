import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { config } from '../config';

interface User {
  id: string;
  email?: string;
  name?: string;
  provider: string;
}

// Serialize user into session
passport.serializeUser((user: Express.User, done) => {
  done(null, user);
});

// Deserialize user from session
passport.deserializeUser((user: Express.User, done) => {
  done(null, user);
});

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user: User = {
          id: profile.id,
          email: profile.emails?.[0]?.value,
          name: profile.displayName,
          provider: 'google',
        };
        return done(null, user);
      } catch (error) {
        return done(error as Error);
      }
    }
  )
); 