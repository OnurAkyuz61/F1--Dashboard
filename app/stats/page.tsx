import { getDriverStandings, getConstructorStandings, getLastRaceResults } from "@/lib/api";
import StatsPageContent from "@/components/StatsPageContent";

export default async function StatsPage() {
  const [driverData, constructors, lastRace] = await Promise.all([
    getDriverStandings(),
    getConstructorStandings(),
    getLastRaceResults(),
  ]);

  return (
    <StatsPageContent
      drivers={driverData.standings}
      constructors={constructors}
      lastRace={lastRace}
      season={driverData.season}
    />
  );
}

