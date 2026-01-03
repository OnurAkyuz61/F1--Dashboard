import { getDriverStandings, getConstructorStandings, getLastRaceResults } from "@/lib/api";
import StatsPageContent from "@/components/StatsPageContent";

export default async function StatsPage() {
  const [drivers, constructors, lastRace] = await Promise.all([
    getDriverStandings(),
    getConstructorStandings(),
    getLastRaceResults(),
  ]);

  return (
    <StatsPageContent
      drivers={drivers}
      constructors={constructors}
      lastRace={lastRace}
    />
  );
}

