"use client";

import { useState } from "react";
import { getDriverCode, getDriverImage } from "@/lib/image-map";
import DriverHelmet from "@/components/DriverHelmet";

interface DriverAvatarProps {
  driverId: string;
  givenName: string;
  familyName: string;
  code?: string;
  number?: string;
  teamColor: string;
  size?: "sm" | "lg";
  className?: string;
}

/**
 * Driver visual: a registered photo when available, otherwise a
 * team-colored race-number tile. Never renders a broken image.
 */
export default function DriverAvatar({
  driverId,
  givenName,
  familyName,
  code,
  number,
  teamColor,
  size = "sm",
  className = "",
}: DriverAvatarProps) {
  const [failed, setFailed] = useState(false);
  const photo = failed ? null : getDriverImage(driverId);
  const driverCode = getDriverCode(code, familyName);
  const fullName = `${givenName} ${familyName}`;

  if (size === "sm") {
    return (
      <div
        className={`relative w-10 h-10 shrink-0 rounded-full overflow-hidden flex items-center justify-center font-display font-bold text-[11px] tracking-wider text-white ${className}`}
        style={{
          background: `linear-gradient(135deg, ${teamColor}66, ${teamColor}1a)`,
          boxShadow: `inset 0 0 0 2px ${teamColor}`,
        }}
        title={fullName}
      >
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo}
            alt={fullName}
            className="absolute inset-0 w-full h-full object-cover object-top"
            onError={() => setFailed(true)}
          />
        ) : (
          driverCode
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative w-28 h-28 md:w-32 md:h-32 shrink-0 rounded-2xl overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(145deg, ${teamColor}55 0%, ${teamColor}14 60%, transparent 100%)`,
        boxShadow: `inset 0 0 0 1px ${teamColor}66`,
      }}
    >
      {photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo}
          alt={fullName}
          className="absolute inset-0 w-full h-full object-contain object-bottom"
          onError={() => setFailed(true)}
        />
      ) : (
        <DriverHelmet
          teamColor={teamColor}
          number={number}
          code={driverCode}
          title={fullName}
          className="absolute inset-0 w-full h-full p-2"
        />
      )}
    </div>
  );
}
