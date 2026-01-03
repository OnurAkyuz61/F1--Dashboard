"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Trophy, Flag } from "lucide-react";
import Navbar from "@/components/Navbar";
import type { Race } from "@/lib/types";

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

  raceSchedule.forEach((race) => {
    const raceDate = new Date(`${race.date}T${race.time || "14:00:00"}Z`);
    if (raceDate < now) {
      pastRaces.push(race);
    } else {
      upcomingRaces.push(race);
    }
  });

  // Sort past races by date (newest first) and upcoming by date (oldest first)
  pastRaces.sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time || "14:00:00"}Z`);
    const dateB = new Date(`${b.date}T${b.time || "14:00:00"}Z`);
    return dateB.getTime() - dateA.getTime();
  });

  upcomingRaces.sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time || "14:00:00"}Z`);
    const dateB = new Date(`${b.date}T${b.time || "14:00:00"}Z`);
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
            const raceDate = new Date(`${race.date}T${race.time || "14:00:00"}Z`);
            const isPast = raceDate < now;
            const winner = winnersMap.get(race.raceName);

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
                  {!isPast && (
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
                    <span className="text-sm">
                      {raceDate.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="text-white/40">•</span>
                    <span className="text-sm">
                      {raceDate.toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </span>
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

