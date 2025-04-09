import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { TeamMember } from './TeamMember';
import { Team as ITeam } from '@teamer/shared';

@Entity()
export class Team implements Omit<ITeam, 'id' | 'members'> {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  createdBy!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => TeamMember, (teamMember) => teamMember.team)
  members!: TeamMember[];
} 