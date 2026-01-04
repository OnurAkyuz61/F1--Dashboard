"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/Tabs";
import { Trophy, Users } from "lucide-react";
import DriverCard from "@/components/DriverCard";
import type { DriverStanding, ConstructorStanding } from "@/lib/types";

interface StandingsPageContentProps {
  driverStandings: DriverStanding[];
  constructorStandings: ConstructorStanding[];
}

export default function StandingsPageContent({
  driverStandings,
  constructorStandings,
}: StandingsPageContentProps) {
  const [activeTab, setActiveTab] = useState("drivers");

  const podiumGradients = [
    "from-yellow-500/20 via-yellow-500/10 to-transparent border-yellow-500/30",
    "from-gray-400/20 via-gray-400/10 to-transparent border-gray-400/30",
    "from-amber-600/20 via-amber-600/10 to-transparent border-amber-600/30",
  ];

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
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-5xl font-display font-bold">Standings</h1>
            <span className="px-3 py-1 rounded-full bg-white/10 text-white/60 text-xs font-semibold uppercase tracking-wider border border-white/20">
              2025 Season
            </span>
          </div>
          <p className="text-white/60">2025 Final Results - Driver and Constructor Rankings</p>
        </motion.div>

        <Tabs defaultValue="drivers">
          <TabsList>
            <TabsTrigger
              value="drivers"
              onClick={() => setActiveTab("drivers")}
              isActive={activeTab === "drivers"}
            >
              <Users size={16} className="mr-2" />
              Drivers
            </TabsTrigger>
            <TabsTrigger
              value="constructors"
              onClick={() => setActiveTab("constructors")}
              isActive={activeTab === "constructors"}
            >
              <Trophy size={16} className="mr-2" />
              Constructors
            </TabsTrigger>
          </TabsList>

          <TabsContent value="drivers" isActive={activeTab === "drivers"}>
            {/* Season Context Header */}
            <div className="mb-6 pb-4 border-b border-white/10">
              <h2 className="text-2xl font-display font-bold mb-1">Driver Standings</h2>
              <p className="text-xs text-white/40">2025 Final Results</p>
            </div>
            
            {/* Desktop: Grid Layout */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {driverStandings.map((driver, index) => (
                <DriverCard
                  key={driver.Driver.driverId}
                  driver={driver}
                  rank={driver.position}
                  index={index}
                />
              ))}
            </div>

            {/* Mobile: Compact List */}
            <div className="md:hidden space-y-4">
              {driverStandings.map((driver, index) => (
                <motion.div
                  key={driver.Driver.driverId}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className="glass-strong rounded-xl p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-2xl font-display font-bold text-white/40 min-w-[40px]">
                        {driver.position}
                      </span>
                      <div className="flex-1">
                        <div className="font-semibold text-lg">
                          {driver.Driver.givenName} {driver.Driver.familyName}
                        </div>
                        <div className="text-sm text-white/60">
                          {driver.Constructors[0]?.name || "Unknown"}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-display font-bold text-f1-red">
                        {driver.points}
                      </div>
                      <div className="text-xs text-white/40">pts</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="constructors" isActive={activeTab === "constructors"}>
            {/* Season Context Header */}
            <div className="mb-6 pb-4 border-b border-white/10">
              <h2 className="text-2xl font-display font-bold mb-1">Constructor Standings</h2>
              <p className="text-xs text-white/40">2025 Final Results</p>
            </div>
            
            <div className="glass-strong rounded-2xl p-6 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-4 px-4 text-sm font-display font-bold text-white/60 uppercase tracking-wider">
                        Rank
                      </th>
                      <th className="text-left py-4 px-4 text-sm font-display font-bold text-white/60 uppercase tracking-wider">
                        Team
                      </th>
                      <th className="text-right py-4 px-4 text-sm font-display font-bold text-white/60 uppercase tracking-wider">
                        Points
                      </th>
                      <th className="text-right py-4 px-4 text-sm font-display font-bold text-white/60 uppercase tracking-wider">
                        Wins
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {constructorStandings.map((constructor, index) => (
                      <motion.tr
                        key={constructor.Constructor.constructorId}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05, duration: 0.4 }}
                        className={`
                          border-b border-white/5 hover:bg-white/5 transition-colors
                          ${index < 3 ? `bg-gradient-to-r ${podiumGradients[index]} border-l-4` : ""}
                        `}
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-display font-bold text-white/40">
                              {constructor.position}
                            </span>
                            {index < 3 && (
                              <Trophy
                                className={
                                  index === 0
                                    ? "text-yellow-500"
                                    : index === 1
                                    ? "text-gray-400"
                                    : "text-amber-600"
                                }
                                size={20}
                              />
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-f1-red/30 to-f1-red/10 flex items-center justify-center font-display font-bold text-xs">
                              {constructor.Constructor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)
                                .toUpperCase()}
                            </div>
                            <div>
                              <div className="font-semibold text-lg">
                                {constructor.Constructor.name}
                              </div>
                              <div className="text-sm text-white/60">
                                {constructor.Constructor.nationality}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className="text-xl font-display font-bold text-f1-red">
                            {constructor.points}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className="text-lg font-semibold">{constructor.wins}</span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

