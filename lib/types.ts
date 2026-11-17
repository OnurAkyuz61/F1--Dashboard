// TypeScript interfaces for F1 data

export interface CircuitLocation {
  circuitId?: string;
  locality?: string;
  lat?: number;
  long?: number;
}

export interface Race extends CircuitLocation {
  date: string;
  time?: string;
  circuitName: string;
  country: string;
  round: number;
  season: number;
  raceName: string;
}

export interface Driver {
  driverId: string;
  givenName: string;
  familyName: string;
  nationality: string;
  permanentNumber?: string;
  code?: string;
}

export interface Constructor {
  constructorId: string;
  name: string;
  nationality: string;
}

export interface DriverStanding {
  position: number;
  points: number;
  wins: number;
  Driver: Driver;
  Constructors: Constructor[];
}

export interface ConstructorStanding {
  position: number;
  points: number;
  wins: number;
  Constructor: Constructor;
}

export interface RaceResult extends CircuitLocation {
  raceName: string;
  date: string;
  circuitName: string;
  country: string;
  Results: {
    position: number;
    Driver: Driver;
    Constructor: Constructor;
    points: string;
  }[];
}

export interface NextRace extends CircuitLocation {
  date: string;
  circuitName: string;
  country: string;
  raceName: string;
  round: number;
  time?: string;
}

export interface CircuitInfo {
  name: string;
  country: string;
  length?: string;
  laps?: number;
  weather?: string;
  temperature?: number;
}

