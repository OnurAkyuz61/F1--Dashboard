"use client";

import { motion } from "framer-motion";
import { Trophy, TrendingUp, Award, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import type { DriverStanding, ConstructorStanding, RaceResult } from "@/lib/types";

interface StatsPageContentProps {
  drivers: DriverStanding[];
  constructors: ConstructorStanding[];
  lastRace: RaceResult | null;
}

export default function StatsPageContent({
  drivers,
  constructors,
  lastRace,
}: StatsPageContentProps) {
  // Calculate statistics
  const totalWins = drivers.reduce((sum, driver) => sum + driver.wins, 0);
  const totalPoints = drivers.reduce((sum, driver) => sum + driver.points, 0);
  const topDriver = drivers[0];
  const topTeam = constructors[0];
  const mostWins = drivers.reduce((max, driver) =>
    driver.wins > max.wins ? driver : max
  );

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
          <h1 className="text-5xl font-display font-bold mb-2">Statistics</h1>
          <p className="text-white/60">2025 Season Overview</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Points */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="glass-strong rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Zap className="text-f1-red" size={32} />
            </div>
            <div className="text-3xl font-display font-bold mb-1">
              {totalPoints.toLocaleString()}
            </div>
            <div className="text-sm text-white/60">Total Points</div>
          </motion.div>

          {/* Total Wins */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-strong rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Trophy className="text-yellow-500" size={32} />
            </div>
            <div className="text-3xl font-display font-bold mb-1">
              {totalWins}
            </div>
            <div className="text-sm text-white/60">Total Wins</div>
          </motion.div>

          {/* Top Driver */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="glass-strong rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Award className="text-f1-red" size={32} />
            </div>
            <div className="text-xl font-display font-bold mb-1">
              {topDriver?.Driver.givenName} {topDriver?.Driver.familyName}
            </div>
            <div className="text-sm text-white/60">Champion</div>
          </motion.div>

          {/* Top Team */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="glass-strong rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="text-f1-red" size={32} />
            </div>
            <div className="text-xl font-display font-bold mb-1">
              {topTeam?.Constructor.name}
            </div>
            <div className="text-sm text-white/60">Constructors' Champion</div>
          </motion.div>
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Most Wins */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="glass-strong rounded-2xl p-6"
          >
            <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-3">
              <Trophy className="text-yellow-500" size={24} />
              Most Wins
            </h2>
            <div className="space-y-4">
              {drivers
                .filter((d) => d.wins > 0)
                .sort((a, b) => b.wins - a.wins)
                .slice(0, 5)
                .map((driver, index) => (
                  <div
                    key={driver.Driver.driverId}
                    className="flex items-center justify-between glass rounded-lg p-4"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-display font-bold text-white/40 w-8">
                        {index + 1}
                      </span>
                      <div>
                        <div className="font-semibold text-lg">
                          {driver.Driver.givenName} {driver.Driver.familyName}
                        </div>
                        <div className="text-sm text-white/60">
                          {driver.Constructors[0]?.name}
                        </div>
                      </div>
                    </div>
                    <div className="text-2xl font-display font-bold text-yellow-500">
                      {driver.wins}
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>

          {/* Last Race Winner */}
          {lastRace && lastRace.Results[0] && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="glass-strong rounded-2xl p-6"
            >
              <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-3">
                <Award className="text-f1-red" size={24} />
                Last Race Winner
              </h2>
              <div className="glass rounded-lg p-6 bg-gradient-to-br from-f1-red/10 to-f1-red/5 border border-f1-red/20">
                <div className="text-sm text-white/60 mb-2">{lastRace.raceName}</div>
                <div className="text-3xl font-display font-bold mb-2">
                  {lastRace.Results[0].Driver.givenName}{" "}
                  {lastRace.Results[0].Driver.familyName}
                </div>
                <div className="text-lg text-white/80 mb-4">
                  {lastRace.Results[0].Constructor.name}
                </div>
                <div className="text-sm text-white/60">
                  {lastRace.circuitName}, {lastRace.country}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}

