import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './User';
import { Team } from './Team';
import { TeamMember as ITeamMember } from '@teamer/shared';

@Entity()
export class TeamMember implements ITeamMember {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, (user) => user.teamMemberships)
  user!: User;

  @ManyToOne(() => Team, (team) => team.members)
  team!: Team;

  @Column({
    type: 'varchar',
    enum: ['admin', 'member'],
    default: 'member'
  })
  role!: 'admin' | 'member';

  @CreateDateColumn()
  joinedAt!: Date;
} 