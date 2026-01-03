import type {
  Race,
  DriverStanding,
  ConstructorStanding,
  RaceResult,
  NextRace,
  CircuitInfo,
} from "./types";

// Ergast API base URL (HTTPS mirror via Jolpi)
const ERGAST_API = "https://api.jolpi.ca/ergast/f1";
const LAST_COMPLETED_SEASON = 2025; // For standings
const CURRENT_SEASON = 2026; // For upcoming races

// Helper function to fetch with error handling
async function fetchErgastData<T>(
  url: string,
  transformFn: (data: any) => T
): Promise<T> {
  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return transformFn(data);
  } catch (error) {
    console.warn(`API fetch failed for ${url}:`, error);
    // Return empty array or null based on expected return type
    return [] as T;
  }
}

// Transform Ergast API response to our types
function transformErgastRace(data: any): NextRace | null {
  if (!data?.MRData?.RaceTable?.Races?.[0]) {
    return null;
  }

  const race = data.MRData.RaceTable.Races[0];
  return {
    date: race.date,
    time: race.time || undefined,
    circuitName: race.Circuit.circuitName,
    country: race.Circuit.Location.country,
    raceName: race.raceName,
    round: parseInt(race.round, 10),
  };
}

function transformErgastDriverStandings(data: any): DriverStanding[] {
  if (!data?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings) {
    return [];
  }

  return data.MRData.StandingsTable.StandingsLists[0].DriverStandings.map(
    (standing: any) => ({
      position: parseInt(standing.position, 10),
      points: parseInt(standing.points, 10),
      wins: parseInt(standing.wins, 10),
      Driver: {
        driverId: standing.Driver.driverId,
        givenName: standing.Driver.givenName,
        familyName: standing.Driver.familyName,
        nationality: standing.Driver.nationality,
        permanentNumber: standing.Driver.permanentNumber || undefined,
      },
      Constructors: standing.Constructors.map((c: any) => ({
        constructorId: c.constructorId,
        name: c.name,
        nationality: c.nationality,
      })),
    })
  );
}

function transformErgastConstructorStandings(data: any): ConstructorStanding[] {
  if (
    !data?.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings
  ) {
    return [];
  }

  return data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.map(
    (standing: any) => ({
      position: parseInt(standing.position, 10),
      points: parseInt(standing.points, 10),
      wins: parseInt(standing.wins, 10),
      Constructor: {
        constructorId: standing.Constructor.constructorId,
        name: standing.Constructor.name,
        nationality: standing.Constructor.nationality,
      },
    })
  );
}

function transformErgastRaceSchedule(data: any): Race[] {
  if (!data?.MRData?.RaceTable?.Races) {
    return [];
  }

  return data.MRData.RaceTable.Races.map((race: any) => ({
    date: race.date,
    time: race.time || undefined,
    circuitName: race.Circuit.circuitName,
    country: race.Circuit.Location.country,
    round: parseInt(race.round, 10),
    season: parseInt(race.season, 10),
    raceName: race.raceName,
  }));
}

function transformErgastLastRace(data: any): RaceResult | null {
  if (!data?.MRData?.RaceTable?.Races?.[0]) {
    return null;
  }

  const race = data.MRData.RaceTable.Races[0];
  return {
    raceName: race.raceName,
    date: race.date,
    circuitName: race.Circuit.circuitName,
    country: race.Circuit.Location.country,
    Results: race.Results?.map((result: any) => ({
      position: parseInt(result.position, 10),
      Driver: {
        driverId: result.Driver.driverId,
        givenName: result.Driver.givenName,
        familyName: result.Driver.familyName,
        nationality: result.Driver.nationality,
        permanentNumber: result.Driver.permanentNumber || undefined,
      },
      Constructor: {
        constructorId: result.Constructor.constructorId,
        name: result.Constructor.name,
        nationality: result.Constructor.nationality,
      },
      points: result.points,
    })) || [],
  };
}

// API Functions

/**
 * Get driver standings for the last completed season (2025)
 */
export async function getDriverStandings(): Promise<DriverStanding[]> {
  const url = `${ERGAST_API}/${LAST_COMPLETED_SEASON}/driverStandings.json`;
  return fetchErgastData(url, transformErgastDriverStandings);
}

/**
 * Get constructor standings for the last completed season (2025)
 */
export async function getConstructorStandings(): Promise<ConstructorStanding[]> {
  const url = `${ERGAST_API}/${LAST_COMPLETED_SEASON}/constructorStandings.json`;
  return fetchErgastData(url, transformErgastConstructorStandings);
}

/**
 * Get the next race from the current season (2026)
 * Returns null if no race is found
 */
export async function getNextRace(): Promise<NextRace | null> {
  const url = `${ERGAST_API}/${CURRENT_SEASON}/next.json`;
  
  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return transformErgastRace(data);
  } catch (error) {
    console.warn(`API fetch failed for ${url}:`, error);
    return null;
  }
}

/**
 * Get the full race schedule for the current season (2026)
 */
export async function getRaceSchedule(): Promise<Race[]> {
  const url = `${ERGAST_API}/${CURRENT_SEASON}.json`;
  return fetchErgastData(url, transformErgastRaceSchedule);
}

/**
 * Get the last race results from the last completed season (2025)
 */
export async function getLastRaceResults(): Promise<RaceResult | null> {
  const url = `${ERGAST_API}/${LAST_COMPLETED_SEASON}/last/results.json`;
  
  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return transformErgastLastRace(data);
  } catch (error) {
    console.warn(`API fetch failed for ${url}:`, error);
    return null;
  }
}

/**
 * Get circuit info (returns mock data for now as it requires additional API calls)
 */
export async function getCircuitInfo(raceName?: string): Promise<CircuitInfo> {
  // This would require fetching circuit-specific data from Ergast
  // For now, return a generic structure
  return {
    name: "Circuit Information",
    country: "Unknown",
  };
}

/**
 * Get all teams (alias for constructor standings)
 */
export async function getAllTeams(): Promise<ConstructorStanding[]> {
  return getConstructorStandings();
}
