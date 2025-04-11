import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { FieldSchedule } from './FieldSchedule';
import { Field as IField } from '@teamer/shared/dist/types/field';
import { User } from './User';

@Entity()
export class Field implements Omit<IField, 'id' | 'managerId' | 'schedules'> {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  cover?: string;

  @Column({ type: 'int' })
  numberOfSeats!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  priceFrom!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  priceTo!: number;

  @Column({ nullable: true })
  managerPhone?: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  googleMapsLink?: string;

  @Column({ type: 'decimal', precision: 10, scale: 7 })
  latitude!: number;

  @Column({ type: 'decimal', precision: 10, scale: 7 })
  longitude!: number;

  @Column()
  maxPlayersCount!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  lengthMeters!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  widthMeters!: number;

  @Column()
  address!: string;

  @Column()
  district!: string;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column()
  managerId!: string;

  @ManyToOne(() => User, (user) => user.managedFields)
  manager!: User;

  @OneToMany(() => FieldSchedule, (schedule) => schedule.field)
  schedules!: FieldSchedule[];

  toJSON(): IField {
    return {
      id: this.id,
      name: this.name,
      cover: this.cover,
      numberOfSeats: this.numberOfSeats,
      priceFrom: this.priceFrom,
      priceTo: this.priceTo,
      managerPhone: this.managerPhone,
      description: this.description,
      googleMapsLink: this.googleMapsLink,
      latitude: this.latitude,
      longitude: this.longitude,
      maxPlayersCount: this.maxPlayersCount,
      lengthMeters: this.lengthMeters,
      widthMeters: this.widthMeters,
      address: this.address,
      district: this.district,
      imageUrl: this.imageUrl,
      managerId: this.managerId,
      schedules: this.schedules?.map(schedule => ({
        id: schedule.id,
        fieldId: schedule.fieldId,
        date: schedule.date,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        status: schedule.status
      }))
    };
  }
} 