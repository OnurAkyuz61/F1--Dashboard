"use client";

import { motion } from "framer-motion";
import { Trophy, TrendingUp } from "lucide-react";
import Link from "next/link";
import type { DriverStanding } from "@/lib/types";
import DriverAvatar from "@/components/DriverAvatar";
import { getTeamColor } from "@/lib/image-map";

interface StandingsCardProps {
  standings: DriverStanding[];
  season: number;
  round?: number | null;
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

export default function StandingsCard({
  standings,
  season,
  round,
}: StandingsCardProps) {
  const topThree = standings.slice(0, 3);
  const chasing = standings.slice(3, 8);
  const standingsLabel =
    round != null
      ? `Round ${round} · ${season} Season`
      : `${season} Season`;

  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="glass-strong rounded-2xl p-4 sm:p-6 h-full"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-display font-bold">Driver Standings</h3>
          <p className="text-xs text-white/40 mt-1">{standingsLabel}</p>
        </div>
        <TrendingUp className="text-f1-red" size={24} />
      </div>

      {topThree.length === 0 && (
        <p className="text-sm text-white/50">Standings are unavailable right now.</p>
      )}

      <div className="space-y-4">
        {topThree.map((driver, index) => (
          <motion.div
            key={driver.Driver.driverId}
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.02, x: 3 }}
            className={`glass rounded-xl p-3 sm:p-4 bg-gradient-to-r ${podiumColors[index]} border-l-4 ${
              index === 0
                ? "border-yellow-500"
                : index === 1
                ? "border-gray-400"
                : "border-amber-600"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-display font-bold text-white/40">
                    #{driver.position}
                  </span>
                  {podiumIcons[index]}
                </div>
                <DriverAvatar
                  driverId={driver.Driver.driverId}
                  givenName={driver.Driver.givenName}
                  familyName={driver.Driver.familyName}
                  code={driver.Driver.code}
                  number={driver.Driver.permanentNumber}
                  teamColor={getTeamColor(
                    driver.Constructors[driver.Constructors.length - 1]?.constructorId || ""
                  )}
                  className="hidden sm:flex"
                />
                <div className="min-w-0">
                  <h4 className="font-semibold text-base sm:text-lg leading-tight break-words">
                    {driver.Driver.givenName} {driver.Driver.familyName}
                  </h4>
                  <p className="text-xs sm:text-sm text-white/60 break-words">
                    {driver.Constructors[driver.Constructors.length - 1]?.name || "Unknown"}
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xl sm:text-2xl font-display font-bold text-f1-red">
                  {driver.points}
                </div>
                <div className="text-xs text-white/40 uppercase">Points</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {chasing.length > 0 && (
        <div className="mt-4 divide-y divide-white/5 rounded-xl border border-white/10 bg-white/[0.03]">
          {chasing.map((driver, i) => {
            const team = driver.Constructors[driver.Constructors.length - 1];
            return (
              <motion.div
                key={driver.Driver.driverId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 + i * 0.05 }}
                className="flex items-center gap-3 px-3 sm:px-4 py-2.5"
              >
                <span className="w-6 text-sm font-display font-bold text-white/40">
                  {driver.position}
                </span>
                <span
                  className="w-1 h-5 rounded-full shrink-0"
                  style={{ background: getTeamColor(team?.constructorId || "") }}
                />
                <span className="flex-1 min-w-0 truncate text-sm font-medium">
                  {driver.Driver.givenName} {driver.Driver.familyName}
                  <span className="hidden sm:inline text-white/40"> · {team?.name}</span>
                </span>
                <span className="text-sm font-display font-bold text-white/80">
                  {driver.points}
                </span>
              </motion.div>
            );
          })}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 pt-4 border-t border-white/10"
      >
        <Link
          href="/standings"
          className="text-sm text-f1-red hover:text-f1-red-dark transition-colors font-medium"
        >
          View Full Standings →
        </Link>
      </motion.div>
    </motion.div>
  );
}
