import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { FieldSchedule } from './FieldSchedule';
import { Field as IField } from '@teamer/shared';
import { User } from './User';

@Entity()
export class Field implements Omit<IField, 'id'> {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  location!: string;

  @Column()
  capacity!: number;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  pricePerHour?: number;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  maxPlayersCount?: number;

  @Column({ nullable: true })
  fieldSize?: string;

  @Column({ nullable: true })
  hasShower?: boolean;

  @Column({ nullable: true })
  hasCover?: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  priceFrom?: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  priceTo?: number;

  @ManyToOne(() => User, user => user.managedFields)
  manager!: User;

  @OneToMany(() => FieldSchedule, (schedule) => schedule.field)
  schedules!: FieldSchedule[];
} 