import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { TeamMember } from './TeamMember';
import { User as IUser } from '@teamer/shared';
import { Field } from './Field';

@Entity()
export class User implements Omit<IUser, 'id' | 'teamMemberships'> {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  name!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  role?: 'user' | 'field_manager' | 'game_organizer';

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => TeamMember, (teamMember) => teamMember.user)
  teamMemberships!: TeamMember[];

  @OneToMany(() => Field, (field) => field.manager)
  managedFields!: Field[];
} 