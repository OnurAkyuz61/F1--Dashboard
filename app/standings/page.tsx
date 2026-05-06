import { getDriverStandings, getConstructorStandings } from "@/lib/api";
import StandingsPageContent from "@/components/StandingsPageContent";

export default async function StandingsPage() {
  const [driverData, constructorStandings] = await Promise.all([
    getDriverStandings(),
    getConstructorStandings(),
  ]);

  return (
    <StandingsPageContent
      driverStandings={driverData.standings}
      constructorStandings={constructorStandings}
      season={driverData.season}
      round={driverData.round}
    />
  );
}
