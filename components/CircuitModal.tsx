"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin } from "lucide-react";
import type { Race } from "@/lib/types";
import { formatRaceDate } from "@/lib/date-utils";
import { getCircuitImageUrl, DEFAULT_CIRCUIT_IMAGE } from "@/lib/circuit-images";
import CircuitInfo from "@/components/CircuitInfo";

interface CircuitModalProps {
  race: Race | null;
  onClose: () => void;
}

export default function CircuitModal({ race, onClose }: CircuitModalProps) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = race
    ? imgError
      ? DEFAULT_CIRCUIT_IMAGE
      : getCircuitImageUrl(race.circuitName)
    : "";

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (race) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [race, onClose]);

  useEffect(() => {
    setImgError(false);
  }, [race?.circuitName]);

  const formattedDateTime = race
    ? formatRaceDate(race.date, race.time)
    : "";

  return (
    <AnimatePresence>
      {race && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-[#111] border border-white/15 shadow-2xl shadow-black/50 flex flex-col lg:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/60 hover:bg-f1-red text-white transition-colors border border-white/10"
            aria-label="Kapat"
          >
            <X size={20} />
          </button>

          {/* Left: Circuit image */}
          <div className="relative w-full lg:w-[45%] min-h-[200px] lg:min-h-full aspect-[16/10] lg:aspect-auto lg:min-h-[400px]">
            <img
              src={imageUrl}
              alt={race.circuitName}
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-black/20 lg:to-black/90" />
            <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
              <span className="inline-block px-2.5 py-1 rounded text-xs font-bold bg-f1-red text-white uppercase tracking-wider">
                Round {race.round}
              </span>
              <h2 className="text-2xl lg:text-3xl font-display font-bold text-white mt-2 drop-shadow-lg">
                {race.raceName}
              </h2>
              <p className="text-white/80 text-sm mt-1">{race.circuitName}</p>
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex-1 overflow-y-auto p-6 lg:p-8 flex flex-col">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/80 mb-6 pb-6 border-b border-white/10">
              <span className="flex items-center gap-2">
                <MapPin size={16} className="text-f1-red shrink-0" />
                {race.country}
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={16} className="text-f1-red shrink-0" />
                {formattedDateTime}
              </span>
            </div>

            <div className="mb-2">
              <h3 className="text-xs uppercase tracking-widest text-white/50 font-semibold mb-3">
                Circuit specs
              </h3>
              <CircuitInfo
                circuitName={race.circuitName}
                country={race.country}
                variant="compact"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
