import { UserRole } from './UserRole';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phoneNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Field {
  id: string;
  name: string;
  location: string;
  capacity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Game {
  id: string;
  teamId: string;
  fieldId: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  createdAt: Date;
  updatedAt: Date;
} 