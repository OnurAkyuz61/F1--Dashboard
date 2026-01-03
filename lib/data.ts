export interface NextRace {
  date: string;
  circuitName: string;
  country: string;
  countdown: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
}

export interface DriverStanding {
  rank: number;
  driver: string;
  team: string;
  points: number;
  nationality: string;
}

export interface RecentResult {
  raceName: string;
  winner: string;
  team: string;
  date: string;
  circuit: string;
}

export interface CircuitInfo {
  name: string;
  country: string;
  length: string;
  laps: number;
  weather: string;
  temperature: number;
}

export const nextRace: NextRace = {
  date: "2024-05-26T14:00:00Z",
  circuitName: "Circuit de Monaco",
  country: "Monaco",
  countdown: {
    days: 12,
    hours: 8,
    minutes: 45,
    seconds: 30,
  },
};

export const driverStandings: DriverStanding[] = [
  {
    rank: 1,
    driver: "Max Verstappen",
    team: "Red Bull Racing",
    points: 258,
    nationality: "Dutch",
  },
  {
    rank: 2,
    driver: "Charles Leclerc",
    team: "Ferrari",
    points: 212,
    nationality: "Monegasque",
  },
  {
    rank: 3,
    driver: "Lewis Hamilton",
    team: "Mercedes",
    points: 198,
    nationality: "British",
  },
  {
    rank: 4,
    driver: "Lando Norris",
    team: "McLaren",
    points: 186,
    nationality: "British",
  },
  {
    rank: 5,
    driver: "Carlos Sainz",
    team: "Ferrari",
    points: 175,
    nationality: "Spanish",
  },
];

export const recentResults: RecentResult = {
  raceName: "Spanish Grand Prix",
  winner: "Max Verstappen",
  team: "Red Bull Racing",
  date: "2024-05-19",
  circuit: "Circuit de Barcelona-Catalunya",
};

export const circuitInfo: CircuitInfo = {
  name: "Circuit de Monaco",
  country: "Monaco",
  length: "3.337 km",
  laps: 78,
  weather: "Sunny",
  temperature: 24,
};

