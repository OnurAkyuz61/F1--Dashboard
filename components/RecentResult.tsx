"use client";

import { motion } from "framer-motion";
import { Flag, Calendar, MapPin } from "lucide-react";
import type { RaceResult } from "@/lib/types";
import DriverAvatar from "@/components/DriverAvatar";
import { getTeamColor } from "@/lib/image-map";
import { getCircuitImageUrl } from "@/lib/circuit-images";

interface RecentResultProps {
  lastRace: RaceResult | null;
}

const podium = [
  { label: "P1", accent: "text-yellow-500", ring: "border-yellow-500/50" },
  { label: "P2", accent: "text-gray-300", ring: "border-gray-400/40" },
  { label: "P3", accent: "text-amber-600", ring: "border-amber-600/40" },
];

export default function RecentResult({ lastRace }: RecentResultProps) {
  if (!lastRace || !lastRace.Results || lastRace.Results.length === 0) {
    return null;
  }

  const topThree = lastRace.Results.slice(0, 3);
  const trackMapUrl = getCircuitImageUrl(lastRace.circuitName, lastRace.circuitId);
  const raceDate = new Date(`${lastRace.date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="glass-strong rounded-2xl p-4 sm:p-6 h-full"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl sm:text-2xl font-display font-bold">Last Race</h3>
        <Flag className="text-f1-red" size={24} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_2fr] gap-4 sm:gap-6">
        {/* Race summary */}
        <div className="relative overflow-hidden rounded-xl p-4 sm:p-6 bg-gradient-to-br from-f1-red/15 to-f1-red/5 border border-f1-red/20 min-h-[160px]">
          {trackMapUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={trackMapUrl}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -right-6 -bottom-6 w-48 h-36 object-contain opacity-20"
            />
          )}
          <div className="relative">
            <h4 className="text-lg sm:text-xl font-display font-bold leading-tight mb-2">
              {lastRace.raceName}
            </h4>
            <p className="text-sm text-white/70 flex items-center gap-2 mb-1">
              <MapPin size={14} className="text-f1-red shrink-0" />
              {lastRace.circuitName}
            </p>
            <p className="text-sm text-white/60 flex items-center gap-2">
              <Calendar size={14} className="text-f1-red shrink-0" />
              {raceDate}
            </p>
          </div>
        </div>

        {/* Podium */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {topThree.map((result, i) => {
            const color = getTeamColor(result.Constructor.constructorId || result.Constructor.name);
            return (
              <motion.div
                key={result.Driver.driverId}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                className={`glass rounded-xl p-4 border ${podium[i].ring} flex sm:flex-col items-center sm:items-start gap-3`}
              >
                <div className="flex items-center gap-3 w-full">
                  <DriverAvatar
                    driverId={result.Driver.driverId}
                    givenName={result.Driver.givenName}
                    familyName={result.Driver.familyName}
                    code={result.Driver.code}
                    number={result.Driver.permanentNumber}
                    teamColor={color}
                  />
                  <span className={`ml-auto font-display font-bold text-xl ${podium[i].accent}`}>
                    {podium[i].label}
                  </span>
                </div>
                <div className="min-w-0 w-full">
                  <div className="font-semibold leading-tight break-words">
                    {result.Driver.givenName} {result.Driver.familyName}
                  </div>
                  <div className="text-sm text-white/60 break-words">
                    {result.Constructor.name}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
