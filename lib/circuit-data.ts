// Static Circuit Data
// Circuit details that are not available in the standard Ergast API
export interface CircuitData {
  length: string;
  laps: number;
  record?: string;
  latitude: number;
  longitude: number;
}

export const CIRCUIT_DATA: Record<string, CircuitData> = {
  // Australian Grand Prix - Albert Park
  albert_park: {
    length: "5.278 km",
    laps: 58,
    record: "1:20.235 (Max Verstappen, 2023)",
    latitude: -37.8497,
    longitude: 144.968,
  },

  // Bahrain Grand Prix - Bahrain International Circuit
  bahrain: {
    length: "5.412 km",
    laps: 57,
    record: "1:31.447 (Pedro de la Rosa, 2005)",
    latitude: 26.0325,
    longitude: 50.5106,
  },

  // Saudi Arabian Grand Prix - Jeddah Corniche Circuit
  jeddah: {
    length: "6.174 km",
    laps: 50,
    record: "1:28.265 (Lewis Hamilton, 2021)",
    latitude: 21.6319,
    longitude: 39.1044,
  },

  // Miami Grand Prix - Miami International Autodrome
  miami: {
    length: "5.412 km",
    laps: 57,
    record: "1:29.708 (Max Verstappen, 2023)",
    latitude: 25.9581,
    longitude: -80.2389,
  },

  // Emilia Romagna Grand Prix - Autodromo Enzo e Dino Ferrari (Imola)
  imola: {
    length: "4.909 km",
    laps: 63,
    record: "1:15.484 (Lewis Hamilton, 2020)",
    latitude: 44.3439,
    longitude: 11.7167,
  },

  // Monaco Grand Prix - Circuit de Monaco
  monaco: {
    length: "3.337 km",
    laps: 78,
    record: "1:12.909 (Max Verstappen, 2021)",
    latitude: 43.7347,
    longitude: 7.4206,
  },

  // Spanish Grand Prix - Circuit de Barcelona-Catalunya
  catalunya: {
    length: "4.675 km",
    laps: 66,
    record: "1:16.330 (Max Verstappen, 2023)",
    latitude: 41.57,
    longitude: 2.2611,
  },

  // Canadian Grand Prix - Circuit Gilles Villeneuve
  villeneuve: {
    length: "4.361 km",
    laps: 70,
    record: "1:13.078 (Valtteri Bottas, 2019)",
    latitude: 45.5,
    longitude: -73.5228,
  },

  // Austrian Grand Prix - Red Bull Ring
  red_bull_ring: {
    length: "4.318 km",
    laps: 71,
    record: "1:05.619 (Carlos Sainz, 2023)",
    latitude: 47.2197,
    longitude: 14.7647,
  },

  // British Grand Prix - Silverstone
  silverstone: {
    length: "5.891 km",
    laps: 52,
    record: "1:27.097 (Max Verstappen, 2020)",
    latitude: 52.0786,
    longitude: -1.0169,
  },
};

// Helper function to get circuit ID from circuit name
export function getCircuitId(circuitName: string): string | null {
  const circuitMap: Record<string, string> = {
    "Albert Park Grand Prix Circuit": "albert_park",
    "Bahrain International Circuit": "bahrain",
    "Jeddah Corniche Circuit": "jeddah",
    "Miami International Autodrome": "miami",
    "Autodromo Enzo e Dino Ferrari": "imola",
    "Circuit de Monaco": "monaco",
    "Circuit de Barcelona-Catalunya": "catalunya",
    "Circuit Gilles Villeneuve": "villeneuve",
    "Red Bull Ring": "red_bull_ring",
    "Silverstone Circuit": "silverstone",
  };

  // Try exact match
  if (circuitMap[circuitName]) {
    return circuitMap[circuitName];
  }

  // Try case-insensitive match
  const lowerName = circuitName.toLowerCase();
  for (const [key, value] of Object.entries(circuitMap)) {
    if (key.toLowerCase() === lowerName) {
      return value;
    }
  }

  return null;
}

// Helper function to get circuit data
export function getCircuitData(circuitName: string): CircuitData | null {
  const circuitId = getCircuitId(circuitName);
  if (!circuitId) {
    return null;
  }
  return CIRCUIT_DATA[circuitId] || null;
}

