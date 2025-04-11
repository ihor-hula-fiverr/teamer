export interface FieldSchedule {
  id: string;
  fieldId: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: 'available' | 'booked' | 'maintenance';
  bookedBy?: string;
  gameId?: string;
} 