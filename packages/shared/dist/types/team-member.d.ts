import { User } from './user';
import { Team } from './team';
export interface TeamMember {
    id: string;
    user: User;
    team: Team;
    role: 'admin' | 'member';
    joinedAt: Date;
}
