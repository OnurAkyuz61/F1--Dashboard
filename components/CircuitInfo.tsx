"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MapPin, Gauge, RotateCcw, Cloud, Thermometer, Loader2 } from "lucide-react";
import { getCircuitData } from "@/lib/circuit-data";
import { getTrackWeather, type WeatherData } from "@/lib/weather";

interface CircuitInfoProps {
  circuitName: string;
  country: string;
}

export default function CircuitInfo({ circuitName, country }: CircuitInfoProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState(false);

  // Get static circuit data
  const circuitData = getCircuitData(circuitName);

  // Fetch weather data when component mounts or circuit changes
  useEffect(() => {
    if (!circuitData) {
      setWeatherLoading(false);
      return;
    }

    const fetchWeather = async () => {
      setWeatherLoading(true);
      setWeatherError(false);
      
      try {
        const weatherData = await getTrackWeather(
          circuitData.latitude,
          circuitData.longitude
        );
        
        if (weatherData) {
          setWeather(weatherData);
        } else {
          setWeatherError(true);
        }
      } catch (error) {
        console.error("Failed to fetch weather:", error);
        setWeatherError(true);
      } finally {
        setWeatherLoading(false);
      }
    };

    fetchWeather();
  }, [circuitData]);

  const infoItems = [
    {
      icon: <MapPin size={20} />,
      label: "Circuit",
      value: circuitName,
    },
    {
      icon: <Gauge size={20} />,
      label: "Length",
      value: circuitData?.length || "TBA",
    },
    {
      icon: <RotateCcw size={20} />,
      label: "Laps",
      value: circuitData?.laps ? `${circuitData.laps}` : "TBA",
    },
    {
      icon: <Cloud size={20} />,
      label: "Weather",
      value: weatherLoading
        ? "Loading..."
        : weatherError
        ? "N/A"
        : weather?.condition || "TBA",
      isLoading: weatherLoading,
    },
    {
      icon: <Thermometer size={20} />,
      label: "Temperature",
      value: weatherLoading
        ? "Loading..."
        : weatherError
        ? "N/A"
        : weather
        ? `${weather.temperature}°C`
        : "TBA",
      isLoading: weatherLoading,
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
            whileHover={!item.isLoading ? { scale: 1.02, x: 5 } : {}}
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
            <span className="font-semibold text-lg flex items-center gap-2">
              {item.isLoading ? (
                <Loader2 size={16} className="animate-spin text-f1-red" />
              ) : (
                item.value
              )}
            </span>
          </motion.div>
        ))}
      </div>

      {circuitData?.record && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4 pt-4 border-t border-white/10"
        >
          <div className="text-xs text-white/40">
            Lap Record: <span className="text-white/60">{circuitData.record}</span>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 pt-4 border-t border-white/10"
      >
        <div className="flex items-center gap-2 text-white/60">
          <MapPin size={16} />
          <span className="text-sm">{country}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
