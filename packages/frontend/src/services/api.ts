import { User, Team, Field, Game, FieldSchedule } from '@teamer/shared';

const API_BASE_URL = 'http://localhost:3000/api';

// User API
export const userApi = {
  getAll: async (): Promise<User[]> => {
    const response = await fetch(`${API_BASE_URL}/users`);
    return response.json();
  },

  getById: async (id: string): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    return response.json();
  },

  create: async (user: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    return response.json();
  },

  update: async (id: string, user: Partial<User>): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    await fetch(`${API_BASE_URL}/users/${id}`, { method: 'DELETE' });
  },
};

// Team API
export const teamApi = {
  getAll: async (): Promise<Team[]> => {
    const response = await fetch(`${API_BASE_URL}/teams`);
    return response.json();
  },

  getById: async (id: string): Promise<Team> => {
    const response = await fetch(`${API_BASE_URL}/teams/${id}`);
    return response.json();
  },

  create: async (team: Omit<Team, 'id' | 'createdAt' | 'members'>): Promise<Team> => {
    const response = await fetch(`${API_BASE_URL}/teams`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(team),
    });
    return response.json();
  },

  join: async (teamId: string, userId: string): Promise<void> => {
    await fetch(`${API_BASE_URL}/teams/${teamId}/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });
  },

  update: async (id: string, team: Partial<Team>): Promise<Team> => {
    const response = await fetch(`${API_BASE_URL}/teams/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(team),
    });
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    await fetch(`${API_BASE_URL}/teams/${id}`, { method: 'DELETE' });
  },
};

// Field API
export const fieldApi = {
  getAll: async (): Promise<Field[]> => {
    const response = await fetch(`${API_BASE_URL}/fields`);
    return response.json();
  },

  getById: async (id: string): Promise<Field> => {
    const response = await fetch(`${API_BASE_URL}/fields/${id}`);
    return response.json();
  },

  create: async (field: Omit<Field, 'id'>): Promise<Field> => {
    const response = await fetch(`${API_BASE_URL}/fields`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(field),
    });
    return response.json();
  },

  update: async (id: string, field: Partial<Field>): Promise<Field> => {
    const response = await fetch(`${API_BASE_URL}/fields/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(field),
    });
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    await fetch(`${API_BASE_URL}/fields/${id}`, { method: 'DELETE' });
  },

  getSchedule: async (id: string, startDate?: string, endDate?: string): Promise<FieldSchedule[]> => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    const response = await fetch(`${API_BASE_URL}/fields/${id}/schedule?${params.toString()}`);
    return response.json();
  },

  createSchedule: async (id: string, schedule: Omit<FieldSchedule, 'id' | 'fieldId'>): Promise<FieldSchedule> => {
    const response = await fetch(`${API_BASE_URL}/fields/${id}/schedule`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(schedule),
    });
    return response.json();
  },
};

// Game API
export const gameApi = {
  getAll: async (): Promise<Game[]> => {
    const response = await fetch(`${API_BASE_URL}/games`);
    return response.json();
  },

  getById: async (id: string): Promise<Game> => {
    const response = await fetch(`${API_BASE_URL}/games/${id}`);
    return response.json();
  },

  create: async (game: Omit<Game, 'id' | 'status'>): Promise<Game> => {
    const response = await fetch(`${API_BASE_URL}/games`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(game),
    });
    return response.json();
  },

  updateStatus: async (id: string, status: Game['status'], score?: Game['score']): Promise<Game> => {
    const response = await fetch(`${API_BASE_URL}/games/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, score }),
    });
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    await fetch(`${API_BASE_URL}/games/${id}`, { method: 'DELETE' });
  },
}; 