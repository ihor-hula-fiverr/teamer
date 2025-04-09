import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { FieldSchedule } from './FieldSchedule';
import { Field as IField } from '@teamer/shared';

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

  @OneToMany(() => FieldSchedule, schedule => schedule.field)
  schedules!: FieldSchedule[];
} 