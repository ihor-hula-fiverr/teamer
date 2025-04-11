import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const userData = await response.json();
            console.log('Received user data:', userData); // Debug log
            setUser({
              id: userData.id,
              email: userData.email,
              name: userData.name,
              role: userData.role || 'user',
              createdAt: userData.createdAt || new Date().toISOString(),
              updatedAt: userData.updatedAt || new Date().toISOString()
            });
          } else {
            localStorage.removeItem('token');
          }
        }
      } catch (err) {
        console.error('Auth check failed:', err);
      } finally {
        setLoading(false);
      }
    };

    // Check for Google OAuth callback
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      handleGoogleCallback(token);
      // Remove token from URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      checkAuth();
    }
  }, []);

  const register = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      setUser({
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role || 'user',
        createdAt: data.user.createdAt || new Date().toISOString(),
        updatedAt: data.user.updatedAt || new Date().toISOString()
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      console.log('Login response data:', data); // Debug log
      setUser({
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role || 'user',
        createdAt: data.user.createdAt || new Date().toISOString(),
        updatedAt: data.user.updatedAt || new Date().toISOString()
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);
      window.location.href = `${API_BASE_URL}/auth/google`;
    } catch (err) {
      setError('Google sign in failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Add a function to handle Google OAuth callback
  const handleGoogleCallback = async (token: string) => {
    try {
      setLoading(true);
      setError(null);
      localStorage.setItem('token', token);
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const userData = await response.json();
        setUser({
          id: userData.id,
          email: userData.email,
          name: userData.name,
          role: userData.role || 'user',
          createdAt: userData.createdAt || new Date().toISOString(),
          updatedAt: userData.updatedAt || new Date().toISOString()
        });
      }
    } catch (err) {
      setError('Failed to get user data after Google sign in');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      localStorage.removeItem('token');
      setUser(null);
    } catch (err) {
      setError('Logout failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        error,
        login,
        register,
        logout,
        signInWithGoogle,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 