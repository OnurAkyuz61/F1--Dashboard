"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { User } from "lucide-react";
import type { DriverStanding } from "@/lib/types";
import { getDriverImage, getTeamLogo, getTeamColor } from "@/lib/image-map";

interface DriverCardProps {
  driver: DriverStanding;
  rank: number;
  index: number;
}

export default function DriverCard({ driver, rank, index }: DriverCardProps) {
  const teamName = driver.Constructors[0]?.name || "Unknown";
  const teamColor = getTeamColor(teamName);
  const driverImageUrl = getDriverImage(driver.Driver.driverId);
  const teamLogoUrl = getTeamLogo(driver.Constructors[0]?.constructorId || "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="relative overflow-hidden rounded-xl glass-strong group cursor-pointer"
      style={{
        borderTop: `4px solid ${teamColor}`,
      }}
    >
      {/* Gradient Background with Team Color */}
      <div
        className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity"
        style={{
          background: `linear-gradient(to top, ${teamColor} 0%, transparent 50%)`,
        }}
      />

      {/* Team Logo Background (Subtle) */}
      {teamLogoUrl && (
        <div className="absolute top-4 right-4 opacity-5">
          <Image
            src={teamLogoUrl}
            alt={`${teamName} logo`}
            width={120}
            height={120}
            className="object-contain"
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 p-6 h-full flex flex-col">
        {/* Top Row: Rank and Points */}
        <div className="flex items-start justify-between mb-4">
          <div className="text-6xl md:text-7xl font-display font-bold text-white/20">
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

        {/* Driver Name */}
        <div className="mb-4 flex-1">
          <div className="text-sm md:text-base text-white/60 font-medium mb-1">
            {driver.Driver.givenName}
          </div>
          <div className="text-2xl md:text-3xl font-display font-bold uppercase tracking-tight leading-tight">
            {driver.Driver.familyName}
          </div>
          <div className="text-xs text-white/40 mt-2">
            {teamName}
          </div>
        </div>

        {/* Driver Image */}
        <div className="relative h-32 md:h-40 -mb-6 -mr-6 self-end">
          {driverImageUrl ? (
            <Image
              src={driverImageUrl}
              alt={`${driver.Driver.givenName} ${driver.Driver.familyName}`}
              width={200}
              height={200}
              className="object-contain object-bottom-right"
              unoptimized
            />
          ) : (
            <div className="flex items-center justify-center h-full w-32 text-white/20">
              <User size={64} />
            </div>
          )}
        </div>
      </div>

      {/* Wins Badge */}
      {driver.wins > 0 && (
        <div className="absolute top-4 left-4 z-20">
          <div className="bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/50 rounded-full px-3 py-1">
            <span className="text-xs font-display font-bold text-yellow-500">
              {driver.wins} {driver.wins === 1 ? "WIN" : "WINS"}
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}

