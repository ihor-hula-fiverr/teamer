import { TeamMember } from './team-member';

export interface User {
  id: string;
  email: string;
  name: string;
  teamMemberships: TeamMember[];
} 