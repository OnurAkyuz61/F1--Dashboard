import { getRaceSchedule, getLastRaceResults } from "@/lib/api";
import RacesPageContent from "@/components/RacesPageContent";

export default async function RacesPage() {
  const [raceSchedule, lastRace] = await Promise.all([
    getRaceSchedule(),
    getLastRaceResults(),
  ]);

  // Create a map of race winners from last race results
  const winnersMap = new Map<string, string>();
  if (lastRace) {
    const winner = lastRace.Results[0];
    if (winner) {
      winnersMap.set(
        lastRace.raceName,
        `${winner.Driver.givenName} ${winner.Driver.familyName}`
      );
    }
  }

  return (
    <RacesPageContent raceSchedule={raceSchedule} winnersMap={winnersMap} />
  );
}

