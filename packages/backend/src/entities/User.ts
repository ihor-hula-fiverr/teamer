import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { TeamMember } from './TeamMember';
import { User as IUser } from '@teamer/shared';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  name!: string;

  @Column({
    type: 'varchar',
    enum: ['admin', 'user'],
    default: 'user'
  })
  role!: 'admin' | 'user';

  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  passwordHash!: string;

  @OneToMany(() => TeamMember, (teamMember) => teamMember.user)
  teamMemberships!: TeamMember[];
} 