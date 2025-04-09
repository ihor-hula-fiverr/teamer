import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Field } from './Field';
import { FieldSchedule as IFieldSchedule } from '@teamer/shared';

@Entity('field_schedules')
export class FieldSchedule {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('uuid')
  fieldId!: string;

  @Column('date')
  date!: Date;

  @Column('timestamp')
  private _startTime!: Date;

  @Column('timestamp')
  private _endTime!: Date;

  @ManyToOne(() => Field, field => field.schedules)
  @JoinColumn({ name: 'fieldId' })
  field!: Field;

  @Column({
    type: 'enum',
    enum: ['available', 'booked', 'maintenance'],
    default: 'available'
  })
  status!: 'available' | 'booked' | 'maintenance';

  @Column({ nullable: true })
  bookedBy?: string;

  @Column({ nullable: true })
  gameId?: string;

  // Getters that convert Date to string for the interface
  get startTime(): string {
    return this._startTime.toISOString();
  }

  get endTime(): string {
    return this._endTime.toISOString();
  }

  // Setters that convert string to Date
  set startTime(value: string) {
    this._startTime = new Date(value);
  }

  set endTime(value: string) {
    this._endTime = new Date(value);
  }

  toJSON(): IFieldSchedule {
    return {
      id: this.id,
      fieldId: this.fieldId,
      date: this.date,
      startTime: this.startTime,
      endTime: this.endTime
    };
  }
} 