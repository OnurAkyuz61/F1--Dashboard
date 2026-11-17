"use client";

import { motion } from "framer-motion";
import { Trophy, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import TeamBadge from "@/components/TeamBadge";
import DriverAvatar from "@/components/DriverAvatar";
import { getTeamColor } from "@/lib/image-map";
import type { ConstructorStanding, DriverStanding } from "@/lib/types";

interface TeamsPageContentProps {
  teams: ConstructorStanding[];
  drivers: DriverStanding[];
  season: number;
}

const trophyColors = ["text-yellow-500", "text-gray-400", "text-amber-600"];

export default function TeamsPageContent({
  teams,
  drivers,
  season,
}: TeamsPageContentProps) {
  const leaderPoints = Math.max(...teams.map((t) => t.points), 1);

  // Group drivers by the team they currently race for (last constructor listed)
  const driversByTeam = drivers.reduce<Record<string, DriverStanding[]>>(
    (acc, d) => {
      const id = d.Constructors[d.Constructors.length - 1]?.constructorId;
      if (id) (acc[id] ||= []).push(d);
      return acc;
    },
    {}
  );

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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-2">Teams</h1>
          <p className="text-white/60">{season} Formula 1 constructors</p>
        </motion.div>

        {teams.length === 0 ? (
          <div className="glass-strong rounded-2xl p-8 text-center text-white/60">
            Team data is unavailable right now. Please try again shortly.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {teams.map((team, index) => {
              const id = team.Constructor.constructorId;
              const color = getTeamColor(id || team.Constructor.name);
              const teamDrivers = driversByTeam[id] || [];

              return (
                <motion.div
                  key={id}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                  className="relative overflow-hidden glass-strong rounded-2xl p-4 sm:p-6"
                  style={{ borderTop: `4px solid ${color}` }}
                >
                  <div
                    className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-20"
                    style={{ background: color }}
                  />

                  <div className="relative flex items-start justify-between gap-3 mb-5">
                    <div className="flex items-center gap-3 min-w-0">
                      <TeamBadge constructorId={id} name={team.Constructor.name} />
                      <div className="min-w-0">
                        <h3 className="text-lg sm:text-xl font-display font-bold leading-tight break-words">
                          {team.Constructor.name}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-white/60">
                          <MapPin size={12} />
                          <span>{team.Constructor.nationality}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {index < 3 && <Trophy className={trophyColors[index]} size={20} />}
                      <span className="text-2xl font-display font-bold text-white/30">
                        P{team.position}
                      </span>
                    </div>
                  </div>

                  {/* Points share vs. leader */}
                  <div className="relative mb-5">
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-3xl font-display font-bold" style={{ color }}>
                        {team.points}
                      </span>
                      <span className="text-xs text-white/50 uppercase tracking-wider">
                        {team.wins} {team.wins === 1 ? "win" : "wins"}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(team.points / leaderPoints) * 100}%` }}
                        transition={{ delay: 0.2 + index * 0.05, duration: 0.8, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ background: color }}
                      />
                    </div>
                  </div>

                  {teamDrivers.length > 0 && (
                    <div className="relative space-y-2 pt-4 border-t border-white/10">
                      {teamDrivers.map((d) => (
                        <div key={d.Driver.driverId} className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <DriverAvatar
                              driverId={d.Driver.driverId}
                              givenName={d.Driver.givenName}
                              familyName={d.Driver.familyName}
                              code={d.Driver.code}
                              number={d.Driver.permanentNumber}
                              teamColor={color}
                            />
                            <span className="text-sm font-medium truncate">
                              {d.Driver.givenName} {d.Driver.familyName}
                            </span>
                          </div>
                          <span className="text-sm text-white/60 shrink-0">
                            {d.points} pts
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
