"use client";

import { useState } from "react";
import {
  getTeamColor,
  getTeamLogo,
  getTeamMonogram,
  isMonochromeLogo,
} from "@/lib/image-map";

interface TeamBadgeProps {
  constructorId: string;
  name: string;
  size?: "sm" | "md";
  className?: string;
}

/**
 * Team mark: the shipped logo (rendered white so dark SVGs stay visible)
 * or a team-colored monogram. Never renders a broken image.
 */
export default function TeamBadge({
  constructorId,
  name,
  size = "md",
  className = "",
}: TeamBadgeProps) {
  const [failed, setFailed] = useState(false);
  const color = getTeamColor(constructorId || name);
  const logo = failed ? null : getTeamLogo(constructorId);
  const dims = size === "sm" ? "w-10 h-10 text-xs" : "w-12 h-12 text-sm";

  return (
    <div
      className={`relative ${dims} shrink-0 rounded-xl flex items-center justify-center font-display font-bold ${className}`}
      style={{
        background: `linear-gradient(135deg, ${color}40, ${color}10)`,
        boxShadow: `inset 0 0 0 1.5px ${color}99`,
        color,
      }}
      title={name}
    >
      {logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logo}
          alt={`${name} logo`}
          className={`w-4/5 h-4/5 object-contain ${
            isMonochromeLogo(constructorId) ? "brightness-0 invert" : ""
          }`}
          onError={() => setFailed(true)}
        />
      ) : (
        getTeamMonogram(name)
      )}
    </div>
  );
}
