"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Trophy, Flag } from "lucide-react";
import Navbar from "@/components/Navbar";
import type { Race } from "@/lib/types";
import { formatRaceDate, getRaceDateObject } from "@/lib/date-utils";

interface RacesPageContentProps {
  raceSchedule: Race[];
  winnersMap: Map<string, string>;
}

export default function RacesPageContent({
  raceSchedule,
  winnersMap,
}: RacesPageContentProps) {
  const now = new Date();
  const pastRaces: Race[] = [];
  const upcomingRaces: Race[] = [];

  // Categorize races into past and upcoming
  raceSchedule.forEach((race) => {
    const raceDateObj = getRaceDateObject(race.date, race.time);
    
    if (!raceDateObj) {
      // If date is invalid, treat as upcoming
      upcomingRaces.push(race);
      return;
    }

    if (raceDateObj < now) {
      pastRaces.push(race);
    } else {
      upcomingRaces.push(race);
    }
  });

  // Sort past races by date (newest first) and upcoming by date (oldest first)
  pastRaces.sort((a, b) => {
    const dateA = getRaceDateObject(a.date, a.time);
    const dateB = getRaceDateObject(b.date, b.time);
    if (!dateA || !dateB) return 0;
    return dateB.getTime() - dateA.getTime();
  });

  upcomingRaces.sort((a, b) => {
    const dateA = getRaceDateObject(a.date, a.time);
    const dateB = getRaceDateObject(b.date, b.time);
    if (!dateA || !dateB) return 0;
    return dateA.getTime() - dateB.getTime();
  });

  const allRaces = [...pastRaces, ...upcomingRaces];

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-6 pt-24 pb-16">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-display font-bold mb-2">Race Schedule</h1>
          <p className="text-white/60">
            {new Date().getFullYear()} Formula 1 World Championship
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allRaces.map((race, index) => {
            const raceDateObj = getRaceDateObject(race.date, race.time);
            const isPast = raceDateObj ? raceDateObj < now : false;
            const winner = winnersMap.get(race.raceName);
            const formattedDateTime = formatRaceDate(race.date, race.time);

            return (
              <motion.div
                key={`${race.round}-${race.raceName}`}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className={`
                  glass-strong rounded-2xl p-6
                  ${isPast ? "opacity-75" : ""}
                  hover:scale-105 transition-transform
                `}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Flag size={20} className="text-f1-red" />
                    <span className="text-sm font-display font-bold text-white/40">
                      Round {race.round}
                    </span>
                  </div>
                  {isPast ? (
                    <span className="px-3 py-1 rounded-full bg-white/10 text-white/60 text-xs font-semibold uppercase tracking-wider border border-white/20">
                      Completed
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-f1-red/20 text-f1-red text-xs font-semibold uppercase tracking-wider">
                      Upcoming
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-display font-bold mb-2">
                  {race.raceName}
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-white/80">
                    <MapPin size={16} />
                    <span className="text-sm">{race.circuitName}</span>
                  </div>

                  <div className="flex items-center gap-2 text-white/60">
                    <Calendar size={16} />
                    <span className="text-sm">{formattedDateTime}</span>
                  </div>

                  {isPast && winner && (
                    <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                      <Trophy size={16} className="text-yellow-500" />
                      <span className="text-sm text-white/80">
                        Winner: <span className="font-semibold">{winner}</span>
                      </span>
                    </div>
                  )}

                  {isPast && !winner && (
                    <div className="pt-2 border-t border-white/10">
                      <span className="text-xs text-white/40">Race completed</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
