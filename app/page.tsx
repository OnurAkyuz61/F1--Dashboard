import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StandingsCard from "@/components/StandingsCard";
import CircuitInfo from "@/components/CircuitInfo";
import RecentResult from "@/components/RecentResult";
import {
  getNextRace,
  getDriverStandings,
  getLastRaceResults,
  getCircuitInfo,
} from "@/lib/api";

export default async function Home() {
  // Fetch all data in parallel
  const [nextRace, driverStandings, lastRace, circuitInfo] = await Promise.all([
    getNextRace(),
    getDriverStandings(),
    getLastRaceResults(),
    getCircuitInfo(),
  ]);

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-24 pb-16">
        {/* Hero Section - Full Width */}
        <div className="mb-8">
          <HeroSection nextRace={nextRace} />
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Standings Card - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <StandingsCard standings={driverStandings} />
          </div>

          {/* Circuit Info - Takes 1 column */}
          <div className="lg:col-span-1">
            <CircuitInfo circuitInfo={circuitInfo} />
          </div>

          {/* Recent Result - Takes full width on large screens */}
          <div className="lg:col-span-3">
            <RecentResult lastRace={lastRace} />
          </div>
        </div>
      </div>
    </main>
  );
}
