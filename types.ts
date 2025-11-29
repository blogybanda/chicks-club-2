export interface TimelineEvent {
  id: number;
  time: string;
  title: string;
  description: string;
  icon?: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  unit: string;
  description?: string;
}

export enum SimulationStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface SimulationResult {
  scenario: string;
  outcome: string;
  survivalProbability: number; // 0-100
  environmentalEffects: string[];
}
