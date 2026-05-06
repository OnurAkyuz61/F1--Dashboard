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
/** Cache TTL — Jolpi "current" endpoints track the live season */
const REVALIDATE_SECONDS = 300;

export type DriverStandingsPayload = {
  standings: DriverStanding[];
  season: number;
  round: number | null;
};

// Helper function to fetch with error handling
async function fetchErgastData<T>(
  url: string,
  transformFn: (data: any) => T
): Promise<T> {
  try {
    const response = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
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
 * Driver standings for the API's current season (`/current/` tracks live championship).
 */
export async function getDriverStandings(): Promise<DriverStandingsPayload> {
  const url = `${ERGAST_API}/current/driverStandings.json`;
  try {
    const response = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const standings = transformErgastDriverStandings(data);
    const seasonStr = data?.MRData?.StandingsTable?.season;
    const roundStr = data?.MRData?.StandingsTable?.round;
    const season = seasonStr
      ? parseInt(seasonStr, 10)
      : new Date().getFullYear();
    const round = roundStr ? parseInt(roundStr, 10) : null;

    return { standings, season, round };
  } catch (error) {
    console.warn(`API fetch failed for ${url}:`, error);
    return {
      standings: [],
      season: new Date().getFullYear(),
      round: null,
    };
  }
}

/**
 * Constructor standings for the current season.
 */
export async function getConstructorStandings(): Promise<ConstructorStanding[]> {
  const url = `${ERGAST_API}/current/constructorStandings.json`;
  return fetchErgastData(url, transformErgastConstructorStandings);
}

/**
 * Next race from the current season schedule (`current.json`).
 */
export async function getNextRace(): Promise<NextRace | null> {
  const url = `${ERGAST_API}/current.json`;

  try {
    const response = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data?.MRData?.RaceTable?.Races) {
      return null;
    }

    const races = data.MRData.RaceTable.Races;
    const currentDate = new Date();

    for (const race of races) {
      const raceTime = race.time || "14:00:00Z";
      const raceDateStr = `${race.date}T${raceTime}`;
      const raceDate = new Date(raceDateStr);

      if (isNaN(raceDate.getTime())) {
        continue;
      }

      if (raceDate > currentDate) {
        return {
          date: race.date,
          time: race.time || undefined,
          circuitName: race.Circuit.circuitName,
          country: race.Circuit.Location.country,
          raceName: race.raceName,
          round: parseInt(race.round, 10),
        };
      }
    }

    return null;
  } catch (error) {
    console.error(`[getNextRace] API fetch failed for ${url}:`, error);
    return null;
  }
}

/**
 * Full race schedule for the current season.
 */
export async function getRaceSchedule(): Promise<Race[]> {
  const url = `${ERGAST_API}/current.json`;
  return fetchErgastData(url, transformErgastRaceSchedule);
}

/**
 * Most recent race results for the current championship.
 */
export async function getLastRaceResults(): Promise<RaceResult | null> {
  const url = `${ERGAST_API}/current/last/results.json`;

  try {
    const response = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
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
