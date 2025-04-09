import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Field } from './Field';
import { Team } from './Team';
import { Game as IGame } from '@teamer/shared';

@Entity()
export class Game implements Omit<IGame, 'id' | 'fieldId' | 'teamAId' | 'teamBId'> {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Field)
  field!: Field;

  @ManyToOne(() => Team)
  teamA!: Team;

  @ManyToOne(() => Team)
  teamB!: Team;

  @Column('date')
  date!: Date;

  @Column('timestamp', { nullable: true })
  startTime?: Date;

  @Column('timestamp', { nullable: true })
  endTime?: Date;

  @Column({
    type: 'enum',
    enum: ['scheduled', 'in_progress', 'completed', 'cancelled'],
    default: 'scheduled'
  })
  status!: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';

  @Column('simple-json', { nullable: true })
  score?: {
    teamA: number;
    teamB: number;
  };

  toJSON(): IGame {
    return {
      id: this.id,
      date: this.date,
      fieldId: this.field.id,
      teamAId: this.teamA.id,
      teamBId: this.teamB.id,
      startTime: this.startTime,
      endTime: this.endTime,
      status: this.status,
      score: this.score
    };
  }
} 