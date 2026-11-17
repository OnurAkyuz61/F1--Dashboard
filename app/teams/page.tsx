import { getAllTeams, getDriverStandings } from "@/lib/api";
import TeamsPageContent from "@/components/TeamsPageContent";

export default async function TeamsPage() {
  const [teams, driverData] = await Promise.all([
    getAllTeams(),
    getDriverStandings(),
  ]);

  return (
    <TeamsPageContent
      teams={teams}
      drivers={driverData.standings}
      season={driverData.season}
    />
  );
}
