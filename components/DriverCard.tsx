"use client";

import { motion } from "framer-motion";
import type { DriverStanding } from "@/lib/types";
import { getTeamColor } from "@/lib/image-map";
import DriverAvatar from "@/components/DriverAvatar";
import TeamBadge from "@/components/TeamBadge";

interface DriverCardProps {
  driver: DriverStanding;
  rank: number;
  index: number;
}

export default function DriverCard({ driver, rank, index }: DriverCardProps) {
  const team = driver.Constructors[driver.Constructors.length - 1];
  const teamName = team?.name || "Unknown";
  const teamColor = getTeamColor(team?.constructorId || teamName);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.6), duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="relative overflow-hidden rounded-xl glass-strong group"
      style={{ borderTop: `4px solid ${teamColor}` }}
    >
      {/* Team color wash */}
      <div
        className="absolute inset-0 opacity-15 group-hover:opacity-25 transition-opacity"
        style={{
          background: `linear-gradient(to top, ${teamColor} 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 p-5 h-full flex flex-col">
        {/* Rank + points */}
        <div className="flex items-start justify-between mb-3">
          <div className="text-6xl font-display font-bold text-white/20 leading-none">
            {rank}
          </div>
          <div className="text-right">
            <div className="text-2xl md:text-3xl font-display font-bold text-f1-red">
              {driver.points}
            </div>
            <div className="text-xs text-white/40 uppercase tracking-wider">
              Points
            </div>
          </div>
        </div>

        {/* Name */}
        <div className="mb-4">
          <div className="text-sm text-white/60 font-medium">
            {driver.Driver.givenName}
          </div>
          <div className="text-2xl font-display font-bold uppercase tracking-tight leading-tight break-words">
            {driver.Driver.familyName}
          </div>
        </div>

        {/* Team + avatar */}
        <div className="mt-auto flex items-end justify-between gap-3">
          <div className="min-w-0 space-y-3">
            <div className="flex items-center gap-2 min-w-0">
              <TeamBadge
                constructorId={team?.constructorId || ""}
                name={teamName}
                size="sm"
              />
              <span className="text-xs text-white/60 leading-tight break-words">
                {teamName}
              </span>
            </div>
            {driver.wins > 0 && (
              <span className="inline-block bg-yellow-500/15 border border-yellow-500/50 rounded-full px-3 py-1 text-xs font-display font-bold text-yellow-500">
                {driver.wins} {driver.wins === 1 ? "WIN" : "WINS"}
              </span>
            )}
          </div>
          <DriverAvatar
            driverId={driver.Driver.driverId}
            givenName={driver.Driver.givenName}
            familyName={driver.Driver.familyName}
            code={driver.Driver.code}
            number={driver.Driver.permanentNumber}
            teamColor={teamColor}
            size="lg"
          />
        </div>
      </div>
    </motion.div>
  );
}
