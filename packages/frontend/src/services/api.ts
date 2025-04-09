import { User, Team, Field, Game, FieldSchedule } from '@teamer/shared';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

// User API
export const userApi = {
  getAll: async (): Promise<User[]> => {
    const response = await api.get('/users');
    return response.data;
  },

  getById: async (id: string): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  create: async (user: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
    const response = await api.post('/users', user);
    return response.data;
  },

  update: async (id: string, user: Partial<User>): Promise<User> => {
    const response = await api.put(`/users/${id}`, user);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};

// Team API
export const teamApi = {
  getAll: async (): Promise<Team[]> => {
    const response = await api.get('/teams');
    return response.data;
  },

  getById: async (id: string): Promise<Team> => {
    const response = await api.get(`/teams/${id}`);
    return response.data;
  },

  create: async (team: Omit<Team, 'id' | 'createdAt' | 'members'>): Promise<Team> => {
    const response = await api.post('/teams', team);
    return response.data;
  },

  join: async (teamId: string, userId: string): Promise<void> => {
    await api.post(`/teams/${teamId}/join`, { userId });
  },

  update: async (id: string, team: Partial<Team>): Promise<Team> => {
    const response = await api.put(`/teams/${id}`, team);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/teams/${id}`);
  },
};

// Field API
export const fieldApi = {
  getAll: async (): Promise<Field[]> => {
    const response = await api.get('/fields');
    return response.data;
  },

  getById: async (id: string): Promise<Field> => {
    const response = await api.get(`/fields/${id}`);
    return response.data;
  },

  create: async (field: Omit<Field, 'id'>): Promise<Field> => {
    const response = await api.post('/fields', field);
    return response.data;
  },

  update: async (id: string, field: Partial<Field>): Promise<Field> => {
    const response = await api.put(`/fields/${id}`, field);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/fields/${id}`);
  },

  getSchedule: async (id: string, startDate?: string, endDate?: string): Promise<FieldSchedule[]> => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    const response = await api.get(`/fields/${id}/schedule?${params.toString()}`);
    return response.data;
  },

  createSchedule: async (id: string, schedule: Omit<FieldSchedule, 'id' | 'fieldId'>): Promise<FieldSchedule> => {
    const response = await api.post(`/fields/${id}/schedule`, schedule);
    return response.data;
  },
};

// Game API
export const gameApi = {
  getAll: async (): Promise<Game[]> => {
    const response = await api.get('/games');
    return response.data;
  },

  getById: async (id: string): Promise<Game> => {
    const response = await api.get(`/games/${id}`);
    return response.data;
  },

  create: async (game: Omit<Game, 'id' | 'status'>): Promise<Game> => {
    const response = await api.post('/games', game);
    return response.data;
  },

  updateStatus: async (id: string, status: Game['status'], score?: { home: number; away: number }): Promise<Game> => {
    const response = await api.patch(`/games/${id}/status`, { status, score });
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/games/${id}`);
  },

  search: async (city: string, date: string): Promise<Game[]> => {
    const response = await api.get(`/games/search?city=${city}&date=${date}`);
    return response.data;
  },
}; 