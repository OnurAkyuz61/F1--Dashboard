// Static Circuit Data
// Circuit details that are not available in the standard Ergast API
export interface CircuitData {
  length: string;
  laps: number;
  record?: string;
  /** Optional — the API now provides coordinates for every circuit */
  latitude?: number;
  longitude?: number;
}

export const CIRCUIT_DATA: Record<string, CircuitData> = {
  // Australian Grand Prix - Albert Park
  albert_park: {
    length: "5.278 km",
    laps: 58,
    record: "1:19.813 (Charles Leclerc, 2024)",
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
    record: "1:30.734 (Lewis Hamilton, 2021)",
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
    record: "1:12.909 (Lewis Hamilton, 2021)",
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
    record: "1:05.619 (Carlos Sainz, 2020)",
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

  // Chinese Grand Prix - Shanghai International Circuit
  shanghai: {
    length: "5.451 km",
    laps: 56,
    record: "1:32.238 (Michael Schumacher, 2004)",
    latitude: 31.3389,
    longitude: 121.2203,
  },

  // Japanese Grand Prix - Suzuka Circuit
  suzuka: {
    length: "5.807 km",
    laps: 53,
    record: "1:30.983 (Lewis Hamilton, 2019)",
    latitude: 34.8431,
    longitude: 136.541,
  },

  // Hungarian Grand Prix - Hungaroring
  hungaroring: { length: "4.381 km", laps: 70, record: "1:16.627 (Lewis Hamilton, 2020)" },

  // Belgian Grand Prix - Spa-Francorchamps
  spa: { length: "7.004 km", laps: 44, record: "1:44.701 (Sergio Perez, 2024)" },

  // Dutch Grand Prix - Zandvoort
  zandvoort: { length: "4.259 km", laps: 72, record: "1:11.097 (Lewis Hamilton, 2021)" },

  // Italian Grand Prix - Monza
  monza: { length: "5.793 km", laps: 53, record: "1:21.046 (Rubens Barrichello, 2004)" },

  // Spanish Grand Prix - Madring (new for 2026)
  madring: { length: "5.474 km", laps: 57 },

  // Azerbaijan Grand Prix - Baku City Circuit
  baku: { length: "6.003 km", laps: 51, record: "1:43.009 (Charles Leclerc, 2019)" },

  // Sepang International Circuit
  sepang: { length: "5.543 km", laps: 56, record: "1:34.223 (Juan Pablo Montoya, 2004)" },

  // Singapore Grand Prix - Marina Bay
  marina_bay: { length: "4.940 km", laps: 62, record: "1:34.486 (Daniel Ricciardo, 2024)" },

  // United States Grand Prix - Circuit of the Americas
  americas: { length: "5.513 km", laps: 56, record: "1:36.169 (Charles Leclerc, 2019)" },

  // Mexico City Grand Prix - Hermanos Rodriguez
  rodriguez: { length: "4.304 km", laps: 71, record: "1:17.774 (Valtteri Bottas, 2021)" },

  // Brazilian Grand Prix - Interlagos
  interlagos: { length: "4.309 km", laps: 71, record: "1:10.540 (Valtteri Bottas, 2018)" },

  // Las Vegas Grand Prix - Strip Circuit
  vegas: { length: "6.201 km", laps: 50, record: "1:34.876 (Lando Norris, 2024)" },

  // Qatar Grand Prix - Lusail
  losail: { length: "5.419 km", laps: 57, record: "1:22.384 (Lando Norris, 2024)" },

  // Abu Dhabi Grand Prix - Yas Marina
  yas_marina: { length: "5.281 km", laps: 58, record: "1:25.637 (Kevin Magnussen, 2024)" },
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
    "Shanghai International Circuit": "shanghai",
    "Suzuka Circuit": "suzuka",
    "Hungaroring": "hungaroring",
    "Circuit de Spa-Francorchamps": "spa",
    "Circuit Park Zandvoort": "zandvoort",
    "Autodromo Nazionale di Monza": "monza",
    "Madring": "madring",
    "Baku City Circuit": "baku",
    "Sepang International Circuit": "sepang",
    "Marina Bay Street Circuit": "marina_bay",
    "Circuit of the Americas": "americas",
    "Autódromo Hermanos Rodríguez": "rodriguez",
    "Autódromo José Carlos Pace": "interlagos",
    "Las Vegas Strip Street Circuit": "vegas",
    "Losail International Circuit": "losail",
    "Lusail International Circuit": "losail",
    "Yas Marina Circuit": "yas_marina",
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
export function getCircuitData(
  circuitName: string,
  circuitIdFromApi?: string
): CircuitData | null {
  const circuitId = circuitIdFromApi || getCircuitId(circuitName);
  if (!circuitId) {
    return null;
  }
  return CIRCUIT_DATA[circuitId] || null;
}

