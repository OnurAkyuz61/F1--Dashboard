import { getRaceSchedule, getCompletedRaceWinners } from "@/lib/api";
import RacesPageContent from "@/components/RacesPageContent";

export default async function RacesPage() {
  const [raceSchedule, winnersByRaceName] = await Promise.all([
    getRaceSchedule(),
    getCompletedRaceWinners(),
  ]);

  return (
    <RacesPageContent
      raceSchedule={raceSchedule}
      winnersByRaceName={winnersByRaceName}
    />
  );
}

