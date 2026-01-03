"use client";

import { motion } from "framer-motion";
import { Flag, Calendar, Trophy } from "lucide-react";
import type { RaceResult } from "@/lib/types";

interface RecentResultProps {
  lastRace: RaceResult | null;
}

export default function RecentResult({ lastRace }: RecentResultProps) {
  if (!lastRace || !lastRace.Results || lastRace.Results.length === 0) {
    return null;
  }

  const winner = lastRace.Results[0];

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="glass-strong rounded-2xl p-6 h-full"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-display font-bold">Last Race</h3>
        <Flag className="text-f1-red" size={24} />
      </div>

      <div className="space-y-4">
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-xl p-6 bg-gradient-to-br from-f1-red/10 to-f1-red/5 border border-f1-red/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="text-yellow-500" size={28} />
            <div>
              <h4 className="text-xl font-bold">{lastRace.raceName}</h4>
              <p className="text-sm text-white/60">{lastRace.circuitName}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/60 uppercase tracking-wider">
                Winner
              </span>
              <span className="font-semibold text-lg">
                {winner.Driver.givenName} {winner.Driver.familyName}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/60 uppercase tracking-wider">
                Team
              </span>
              <span className="font-medium">{winner.Constructor.name}</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <div className="flex items-center gap-2 text-white/60">
                <Calendar size={16} />
                <span className="text-sm">
                  {new Date(lastRace.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
