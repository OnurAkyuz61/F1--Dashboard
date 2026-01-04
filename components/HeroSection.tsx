"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Calendar, MapPin, Clock } from "lucide-react";
import type { NextRace } from "@/lib/types";

interface HeroSectionProps {
  nextRace: NextRace | null;
}

export default function HeroSection({ nextRace }: HeroSectionProps) {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!nextRace) return;
    
    const calculateCountdown = () => {
      // Combine date and time into ISO string
      const raceTime = nextRace.time || "14:00:00Z";
      const raceDateStr = `${nextRace.date}T${raceTime}`;
      const raceDate = new Date(raceDateStr);

      // Validate date
      if (isNaN(raceDate.getTime())) {
        console.error(`[HeroSection] Invalid date: ${raceDateStr}`);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const now = new Date();
      const diff = raceDate.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, [nextRace]);

  const countdownItems = [
    { label: "Days", value: countdown.days },
    { label: "Hours", value: countdown.hours },
    { label: "Minutes", value: countdown.minutes },
    { label: "Seconds", value: countdown.seconds },
  ];

  if (!nextRace) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative min-h-[600px] flex items-center justify-center overflow-hidden rounded-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-f1-red/20 via-background to-background" />
        <div className="relative z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-4 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            SEASON STARTS SOON
          </h2>
          <p className="text-xl text-white/60">The 2026 Formula 1 season is coming soon!</p>
        </div>
      </motion.section>
    );
  }

  // Combine date and time into ISO string
  const raceTime = nextRace.time || "14:00:00Z";
  const raceDateStr = `${nextRace.date}T${raceTime}`;
  const raceDate = new Date(raceDateStr);

  // Validate date before rendering
  if (isNaN(raceDate.getTime())) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative min-h-[600px] flex items-center justify-center overflow-hidden rounded-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-f1-red/20 via-background to-background" />
        <div className="relative z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-4 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            RACE DATE TBA
          </h2>
          <p className="text-xl text-white/60">Race information will be available soon</p>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-[600px] flex items-center justify-center overflow-hidden rounded-2xl"
    >
      {/* Blurred background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-f1-red/20 via-background to-background">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF1801' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.h2
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            className="text-5xl md:text-7xl font-display font-bold mb-4 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent"
          >
            NEXT RACE
          </motion.h2>
          
          <div className="flex items-center justify-center gap-4 mb-4 text-white/80">
            <MapPin size={20} />
            <p className="text-xl font-medium">{nextRace.circuitName}</p>
            <span className="text-white/40">•</span>
            <p className="text-lg">{nextRace.country}</p>
          </div>
          {nextRace.round && (
            <div className="text-sm text-white/60 mb-8">
              Round {nextRace.round}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {countdownItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="glass-strong rounded-xl p-6 text-center"
            >
              <div className="text-4xl md:text-5xl font-display font-bold text-f1-red mb-2">
                {String(item.value).padStart(2, "0")}
              </div>
              <div className="text-sm text-white/60 uppercase tracking-wider">
                {item.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-12 flex items-center justify-center gap-6 text-white/60"
        >
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <span className="text-sm">
              {raceDate.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={18} />
            <span className="text-sm">
              {raceDate.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
