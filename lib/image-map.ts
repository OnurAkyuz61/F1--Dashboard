// Driver & team visual assets
//
// Driver photos: drop official/licensed images into /public/drivers/<driverId>.png
// (driverId = Jolpi/Ergast id, e.g. "antonelli", "max_verstappen") and register
// them below. Drivers without a photo get a generated number/code avatar
// (see components/DriverAvatar.tsx), so nothing ever renders as a broken image.
export const DRIVER_IMAGES: Record<string, string> = {
  // example: antonelli: "/drivers/antonelli.png",
};

// Team logos — only files that actually exist in /public/teams.
// Teams without a logo get a team-colored monogram (components/TeamBadge.tsx).
export const TEAM_LOGOS: Record<string, string> = {
  red_bull: "/teams/redbull-logo-svgrepo-com.svg",
  ferrari: "/teams/ferrari-emblem-1-logo-svgrepo-com.svg",
  mercedes: "/teams/mercedes-me-svgrepo-com.svg",
  mclaren: "/teams/mclaren-alt-svgrepo-com.svg",
  aston_martin: "/teams/aston-martin-alt-svgrepo-com.svg",
};

// Logos drawn in plain black — rendered white so they show on the dark UI.
// Full-color logos (Ferrari, Red Bull) keep their original colors.
const MONOCHROME_LOGOS = new Set(["mercedes", "mclaren", "aston_martin"]);

// Team colors keyed by Jolpi/Ergast constructorId (2026 grid + recent teams)
const TEAM_COLORS_BY_ID: Record<string, string> = {
  mercedes: "#27F4D2",
  ferrari: "#E8002D",
  red_bull: "#3671C6",
  mclaren: "#FF8000",
  rb: "#6692FF",
  alpine: "#0093CC",
  haas: "#B6BABD",
  audi: "#F50537",
  sauber: "#52E252",
  williams: "#64C4FF",
  aston_martin: "#229971",
  cadillac: "#E6E6E6",
};

// Display-name aliases → constructorId
const TEAM_NAME_ALIASES: Record<string, string> = {
  "red bull": "red_bull",
  "red bull racing": "red_bull",
  "rb f1 team": "rb",
  "visa cash app rb": "rb",
  "racing bulls": "rb",
  "alpine f1 team": "alpine",
  "haas f1 team": "haas",
  "aston martin": "aston_martin",
  "aston martin f1 team": "aston_martin",
  "stake f1 team": "sauber",
  "kick sauber": "sauber",
  "williams f1": "williams",
  "cadillac f1 team": "cadillac",
};

const DEFAULT_TEAM_COLOR = "#FF1801";

function resolveTeamId(teamNameOrId: string): string {
  const key = teamNameOrId.trim().toLowerCase();
  if (TEAM_COLORS_BY_ID[key]) return key;
  if (TEAM_NAME_ALIASES[key]) return TEAM_NAME_ALIASES[key];
  const underscored = key.replace(/\s+/g, "_");
  return TEAM_COLORS_BY_ID[underscored] ? underscored : key;
}

/** Hex color for a team — accepts a constructorId or a display name. */
export function getTeamColor(teamNameOrId: string): string {
  if (!teamNameOrId) return DEFAULT_TEAM_COLOR;
  return TEAM_COLORS_BY_ID[resolveTeamId(teamNameOrId)] || DEFAULT_TEAM_COLOR;
}

/** Driver photo URL, or null when none is registered. */
export function getDriverImage(driverId: string): string | null {
  return DRIVER_IMAGES[driverId] || null;
}

/** Team logo URL, or null when we don't ship one. */
export function getTeamLogo(constructorId: string): string | null {
  return TEAM_LOGOS[resolveTeamId(constructorId)] || null;
}

/** True when the team's logo is a black-only SVG that needs inverting. */
export function isMonochromeLogo(constructorId: string): boolean {
  return MONOCHROME_LOGOS.has(resolveTeamId(constructorId));
}

/** Short team monogram, e.g. "Red Bull" → "RB", "Mercedes" → "ME". */
export function getTeamMonogram(teamName: string): string {
  const words = teamName
    .replace(/\b(F1|Team|Racing)\b/gi, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return (words[0] || teamName).slice(0, 2).toUpperCase();
}

/** Three-letter driver code, falling back to the family name. */
export function getDriverCode(code: string | undefined, familyName: string): string {
  if (code) return code.toUpperCase();
  return familyName
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z]/g, "")
    .slice(0, 3)
    .toUpperCase();
}
