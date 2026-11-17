import { useId } from "react";

interface DriverHelmetProps {
  teamColor: string;
  number?: string;
  code: string;
  className?: string;
  title?: string;
}

/** Perceived brightness (0–1) so light liveries get dark numbers */
function luminance(hex: string): number {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  if (Number.isNaN(n)) return 0;
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

/**
 * Original illustrated race helmet in the team's color with the driver's
 * number — a generic design, not any driver's real helmet livery.
 */
export default function DriverHelmet({
  teamColor,
  number,
  code,
  className = "",
  title,
}: DriverHelmetProps) {
  const uid = useId().replace(/:/g, "");
  const light = luminance(teamColor) > 0.7;
  const ink = light ? "#111111" : "#FFFFFF";

  return (
    <svg
      viewBox="0 0 128 104"
      className={className}
      role="img"
      aria-label={title}
    >
      {title && <title>{title}</title>}
      <defs>
        <linearGradient id={`shell-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="18%" stopColor={teamColor} />
          <stop offset="100%" stopColor={teamColor} stopOpacity="0.75" />
        </linearGradient>
        <linearGradient id={`visor-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3a3a46" />
          <stop offset="55%" stopColor="#0b0b10" />
          <stop offset="100%" stopColor="#1d1d26" />
        </linearGradient>
        <radialGradient id={`glow-${uid}`} cx="0.5" cy="0.6" r="0.6">
          <stop offset="0%" stopColor={teamColor} stopOpacity="0.45" />
          <stop offset="100%" stopColor={teamColor} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* glow */}
      <ellipse cx="64" cy="60" rx="62" ry="44" fill={`url(#glow-${uid})`} />

      {/* shell */}
      <path
        d="M16 72 C10 42 32 14 66 12 C96 10 116 32 118 56 L118 66 C118 73 113 78 106 78 L99 78 L92 88 L28 88 C21 88 17 81 16 72 Z"
        fill={`url(#shell-${uid})`}
        stroke="rgba(0,0,0,0.45)"
        strokeWidth="1.5"
      />

      {/* livery stripe */}
      <path
        d="M18 62 C42 54 70 58 92 70 L90 77 C70 66 44 62 20 70 Z"
        fill={ink}
        opacity="0.85"
      />

      {/* visor */}
      <path
        d="M66 34 C86 30 106 38 114 50 L114 60 L72 60 C64 60 60 53 62 46 C63 41 64 37 66 34 Z"
        fill={`url(#visor-${uid})`}
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="1"
      />
      {/* visor reflection */}
      <path d="M72 38 C86 35 100 40 106 46 L98 46 C90 42 80 41 72 42 Z" fill="#FFFFFF" opacity="0.25" />

      {/* top highlight */}
      <path d="M30 34 C40 22 54 17 68 17" fill="none" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" />

      {/* chin / neck seal */}
      <path d="M30 88 L92 88 L88 96 L34 96 Z" fill="#111" opacity="0.9" />

      {/* race number */}
      <text
        x="38"
        y="56"
        textAnchor="middle"
        fontFamily="var(--font-orbitron), sans-serif"
        fontWeight="900"
        fontSize={number && number.length > 1 ? 17 : 21}
        fill={ink}
        stroke={light ? "none" : "rgba(0,0,0,0.35)"}
        strokeWidth="1"
      >
        {number || ""}
      </text>

      {/* code on the chin bar */}
      <text
        x="61"
        y="94"
        textAnchor="middle"
        fontFamily="var(--font-orbitron), sans-serif"
        fontWeight="700"
        fontSize="7"
        letterSpacing="2"
        fill="#FFFFFF"
        opacity="0.8"
      >
        {code}
      </text>
    </svg>
  );
}
