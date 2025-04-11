export interface Game {
  id: string;
  fieldId: string;
  teamAId: string;
  teamBId: string;
  date: Date;
  startTime?: Date;
  endTime?: Date;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  score?: {
    teamA: number;
    teamB: number;
  };
} 