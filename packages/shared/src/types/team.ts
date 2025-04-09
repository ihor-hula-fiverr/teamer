import { TeamMember } from './team-member';

export interface Team {
  id: string;
  name: string;
  description?: string;
  createdBy: string;
  createdAt: Date;
  members: TeamMember[];
} 