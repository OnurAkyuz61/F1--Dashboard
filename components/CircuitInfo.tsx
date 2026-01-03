"use client";

import { motion } from "framer-motion";
import { MapPin, Gauge, RotateCcw, Cloud, Thermometer } from "lucide-react";
import type { CircuitInfo as CircuitInfoType } from "@/lib/types";

interface CircuitInfoProps {
  circuitInfo: CircuitInfoType;
}

export default function CircuitInfo({ circuitInfo }: CircuitInfoProps) {
  const infoItems = [
    {
      icon: <MapPin size={20} />,
      label: "Circuit",
      value: circuitInfo.name,
    },
    {
      icon: <Gauge size={20} />,
      label: "Length",
      value: circuitInfo.length || "N/A",
    },
    {
      icon: <RotateCcw size={20} />,
      label: "Laps",
      value: circuitInfo.laps ? `${circuitInfo.laps}` : "N/A",
    },
    {
      icon: <Cloud size={20} />,
      label: "Weather",
      value: circuitInfo.weather || "N/A",
    },
    {
      icon: <Thermometer size={20} />,
      label: "Temperature",
      value: circuitInfo.temperature ? `${circuitInfo.temperature}°C` : "N/A",
    },
  ];

  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="glass-strong rounded-2xl p-6 h-full"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-display font-bold">Circuit Details</h3>
        <MapPin className="text-f1-red" size={24} />
      </div>

      <div className="space-y-3">
        {infoItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.02, x: 5 }}
            className="glass rounded-lg p-4 flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="text-f1-red group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <span className="text-sm text-white/60 uppercase tracking-wider">
                {item.label}
              </span>
            </div>
            <span className="font-semibold text-lg">{item.value}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 pt-4 border-t border-white/10"
      >
        <div className="flex items-center gap-2 text-white/60">
          <MapPin size={16} />
          <span className="text-sm">{circuitInfo.country}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
