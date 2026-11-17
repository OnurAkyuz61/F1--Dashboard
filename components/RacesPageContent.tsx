"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Trophy, Flag } from "lucide-react";
import Navbar from "@/components/Navbar";
import CircuitModal from "@/components/CircuitModal";
import type { Race } from "@/lib/types";
import { formatRaceDate, getRaceDateObject } from "@/lib/date-utils";
import { useMounted } from "@/lib/use-mounted";
import { getCircuitImageUrl } from "@/lib/circuit-images";

interface RacesPageContentProps {
  raceSchedule: Race[];
  winnersByRaceName: Record<string, string>;
}

export default function RacesPageContent({
  raceSchedule,
  winnersByRaceName,
}: RacesPageContentProps) {
  const now = new Date();
  const allRaces = [...raceSchedule].sort((a, b) => a.round - b.round);
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);
  const mounted = useMounted();
  const season = allRaces[0]?.season ?? now.getFullYear();
  const nextRound = allRaces.find((r) => {
    const d = getRaceDateObject(r.date, r.time);
    return d ? d >= now : false;
  })?.round;

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-14 sm:pb-16">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-2">Race Schedule</h1>
          <p className="text-white/60">
            {season} Formula 1 World Championship · tap a race for circuit details
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {allRaces.map((race, index) => {
            const raceDateObj = getRaceDateObject(race.date, race.time);
            const isPast = raceDateObj ? raceDateObj < now : false;
            const winner = winnersByRaceName[race.raceName];
            const formattedDateTime = formatRaceDate(race.date, race.time, {
              local: mounted,
            });
            const isNext = race.round === nextRound;
            const trackMapUrl = getCircuitImageUrl(race.circuitName, race.circuitId);

            return (
              <motion.div
                key={`${race.round}-${race.raceName}`}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedRace(race)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedRace(race);
                  }
                }}
                className={`
                  glass-strong rounded-2xl p-4 sm:p-6 cursor-pointer
                  ${isPast ? "opacity-75 hover:opacity-100" : ""}
                  ${isNext ? "ring-2 ring-f1-red shadow-lg shadow-f1-red/20" : ""}
                  hover:scale-[1.02] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white
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
                  ) : isNext ? (
                    <span className="px-3 py-1 rounded-full bg-f1-red text-white text-xs font-semibold uppercase tracking-wider">
                      Next
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-f1-red/20 text-f1-red text-xs font-semibold uppercase tracking-wider">
                      Upcoming
                    </span>
                  )}
                </div>

                {trackMapUrl && (
                  <div className="track-grid relative h-28 mb-4 rounded-xl bg-black/30 border border-white/10 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={trackMapUrl}
                      alt={`${race.circuitName} track layout`}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-contain p-3"
                    />
                  </div>
                )}

                <h3 className="text-xl sm:text-2xl font-display font-bold mb-2 leading-tight">
                  {race.raceName}
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-white/80">
                    <MapPin size={16} />
                    <span className="text-sm break-words">{race.circuitName}</span>
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

      <CircuitModal
        race={selectedRace}
        onClose={() => setSelectedRace(null)}
      />
    </main>
  );
}
