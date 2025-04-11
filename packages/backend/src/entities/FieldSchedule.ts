import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Field } from './Field';
import { FieldSchedule as IFieldSchedule } from '@teamer/shared/dist/types/field-schedule';

@Entity('field_schedules')
export class FieldSchedule implements Omit<IFieldSchedule, 'id' | 'fieldId'> {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  fieldId!: string;

  @ManyToOne(() => Field)
  @JoinColumn({ name: 'fieldId' })
  field!: Field;

  @Column({ type: 'date' })
  private _date!: string;

  get date(): Date {
    return new Date(this._date);
  }

  set date(value: Date) {
    this._date = value.toISOString().split('T')[0];
  }

  @Column({ type: 'time' })
  private _startTime!: string;

  get startTime(): string {
    return this._startTime;
  }

  set startTime(value: Date) {
    this._startTime = value.toTimeString().slice(0, 5);
  }

  @Column({ type: 'time' })
  private _endTime!: string;

  get endTime(): string {
    return this._endTime;
  }

  set endTime(value: Date) {
    this._endTime = value.toTimeString().slice(0, 5);
  }

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

  toJSON(): IFieldSchedule {
    return {
      id: this.id,
      fieldId: this.fieldId,
      date: this.date,
      startTime: this.startTime,
      endTime: this.endTime,
      status: this.status,
      bookedBy: this.bookedBy,
      gameId: this.gameId
    };
  }
} 