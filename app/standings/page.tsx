import { getDriverStandings, getConstructorStandings } from "@/lib/api";
import StandingsPageContent from "@/components/StandingsPageContent";

export default async function StandingsPage() {
  const [driverStandings, constructorStandings] = await Promise.all([
    getDriverStandings(),
    getConstructorStandings(),
  ]);

  return (
    <StandingsPageContent
      driverStandings={driverStandings}
      constructorStandings={constructorStandings}
    />
  );
}
