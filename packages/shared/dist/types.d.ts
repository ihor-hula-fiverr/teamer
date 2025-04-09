export interface Field {
    id: string;
    name: string;
    location: string;
    capacity: number;
    description?: string;
    pricePerHour?: number;
}
export interface Team {
    id: string;
    name: string;
    description?: string;
    members: TeamMember[];
    createdBy: string;
    createdAt: Date;
}
export interface TeamMember {
    userId: string;
    role: 'admin' | 'member';
    joinedAt: Date;
}
export interface Game {
    id: string;
    date: Date;
    fieldId: string;
    teamAId: string;
    teamBId: string;
    scoreA?: number;
    scoreB?: number;
    startTime?: Date;
    endTime?: Date;
    status?: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
    score?: {
        teamA: number;
        teamB: number;
    };
}
export interface FieldSchedule {
    id: string;
    fieldId: string;
    date: Date;
    startTime: string;
    endTime: string;
}
export interface User {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'user';
    createdAt: Date;
}
