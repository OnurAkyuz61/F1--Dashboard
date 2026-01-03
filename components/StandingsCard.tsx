"use client";

import { motion } from "framer-motion";
import { Trophy, TrendingUp } from "lucide-react";
import type { DriverStanding } from "@/lib/types";

interface StandingsCardProps {
  standings: DriverStanding[];
}

const podiumColors = [
  "from-yellow-500/20 to-yellow-600/10",
  "from-gray-400/20 to-gray-500/10",
  "from-amber-600/20 to-amber-700/10",
];

const podiumIcons = [
  <Trophy key="gold" className="text-yellow-500" size={24} />,
  <Trophy key="silver" className="text-gray-400" size={24} />,
  <Trophy key="bronze" className="text-amber-600" size={24} />,
];

export default function StandingsCard({ standings }: StandingsCardProps) {
  const topThree = standings.slice(0, 3);

  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="glass-strong rounded-2xl p-6 h-full"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-display font-bold">Driver Standings</h3>
        <TrendingUp className="text-f1-red" size={24} />
      </div>

      <div className="space-y-4">
        {topThree.map((driver, index) => (
          <motion.div
            key={driver.Driver.driverId}
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.02, x: 5 }}
            className={`glass rounded-xl p-4 bg-gradient-to-r ${podiumColors[index]} border-l-4 ${
              index === 0
                ? "border-yellow-500"
                : index === 1
                ? "border-gray-400"
                : "border-amber-600"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-display font-bold text-white/40">
                    #{driver.position}
                  </span>
                  {podiumIcons[index]}
                </div>
                <div>
                  <h4 className="font-semibold text-lg">
                    {driver.Driver.givenName} {driver.Driver.familyName}
                  </h4>
                  <p className="text-sm text-white/60">
                    {driver.Constructors[0]?.name || "Unknown"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-display font-bold text-f1-red">
                  {driver.points}
                </div>
                <div className="text-xs text-white/40 uppercase">Points</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 pt-4 border-t border-white/10"
      >
        <a
          href="/standings"
          className="text-sm text-f1-red hover:text-f1-red-dark transition-colors font-medium"
        >
          View Full Standings →
        </a>
      </motion.div>
    </motion.div>
  );
}
