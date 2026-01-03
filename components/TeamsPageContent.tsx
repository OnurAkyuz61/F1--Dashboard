"use client";

import { motion } from "framer-motion";
import { Users, Trophy, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import type { ConstructorStanding } from "@/lib/types";

interface TeamsPageContentProps {
  teams: ConstructorStanding[];
}

// Team colors for top teams
const teamColors: Record<string, string> = {
  redbull: "border-red-500/50",
  ferrari: "border-red-600/50",
  mercedes: "border-teal-400/50",
  mclaren: "border-orange-500/50",
  aston_martin: "border-emerald-500/50",
};

export default function TeamsPageContent({ teams }: TeamsPageContentProps) {
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
          <h1 className="text-5xl font-display font-bold mb-2">Teams</h1>
          <p className="text-white/60">Formula 1 Constructor Teams</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team, index) => {
            const teamId = team.Constructor.constructorId.toLowerCase();
            const borderColor = teamColors[teamId] || "border-white/10";

            return (
              <motion.div
                key={team.Constructor.constructorId}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`
                  glass-strong rounded-2xl p-6 border-2 ${borderColor}
                  hover:border-opacity-100 transition-all
                `}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-f1-red/30 to-f1-red/10 flex items-center justify-center font-display font-bold text-lg">
                      {team.Constructor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-bold">
                        {team.Constructor.name}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-white/60">
                        <MapPin size={12} />
                        <span>{team.Constructor.nationality}</span>
                      </div>
                    </div>
                  </div>
                  {index < 3 && (
                    <Trophy
                      className={
                        index === 0
                          ? "text-yellow-500"
                          : index === 1
                          ? "text-gray-400"
                          : "text-amber-600"
                      }
                      size={24}
                    />
                  )}
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white/60">
                      <Trophy size={16} />
                      <span className="text-sm">Position</span>
                    </div>
                    <span className="text-lg font-display font-bold">
                      #{team.position}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white/60">
                      <Users size={16} />
                      <span className="text-sm">Points</span>
                    </div>
                    <span className="text-xl font-display font-bold text-f1-red">
                      {team.points}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/60">Wins</span>
                    <span className="text-lg font-semibold">{team.wins}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

