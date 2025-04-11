import { FieldSchedule } from './field-schedule';
export interface Field {
    id: string;
    name: string;
    cover?: string;
    numberOfSeats: number;
    priceFrom: number;
    priceTo: number;
    managerPhone?: string;
    description?: string;
    googleMapsLink?: string;
    latitude: number;
    longitude: number;
    maxPlayersCount: number;
    lengthMeters: number;
    widthMeters: number;
    address: string;
    district: string;
    imageUrl?: string;
    managerId: string;
    schedules?: FieldSchedule[];
}
