// Driver Images Mapping
// Map driverId from API to image URL
// Replace placeholder URLs with actual image URLs when available
export const DRIVER_IMAGES: Record<string, string> = {
  // Top Drivers
  max_verstappen: "https://www.formula1.com/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxverstappen.png",
  lando_norris: "https://www.formula1.com/content/dam/fom-website/drivers/L/LANDOR01_Lando_Norris/landonorris.png",
  oscar_piastri: "https://www.formula1.com/content/dam/fom-website/drivers/O/OSCAPI01_Oscar_Piastri/oscarpiastri.png",
  charles_leclerc: "https://www.formula1.com/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/charlesleclerc.png",
  carlos_sainz: "https://www.formula1.com/content/dam/fom-website/drivers/C/CARSAI01_Carlos_Sainz/carlossainz.png",
  lewis_hamilton: "https://www.formula1.com/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewishamilton.png",
  george_russell: "https://www.formula1.com/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georgerussell.png",
  fernando_alonso: "https://www.formula1.com/content/dam/fom-website/drivers/F/FERALO01_Fernando_Alonso/fernandoalonso.png",
  lance_stroll: "https://www.formula1.com/content/dam/fom-website/drivers/L/LANSTR01_Lance_Stroll/lancestroll.png",
  sergio_perez: "https://www.formula1.com/content/dam/fom-website/drivers/S/SERPER01_Sergio_Perez/sergioperez.png",
  yuki_tsunoda: "https://www.formula1.com/content/dam/fom-website/drivers/Y/YUKTSU01_Yuki_Tsunoda/yukitsunoda.png",
  daniel_ricciardo: "https://www.formula1.com/content/dam/fom-website/drivers/D/DANRIC01_Daniel_Ricciardo/danielricciardo.png",
  pierre_gasly: "https://www.formula1.com/content/dam/fom-website/drivers/P/PIEGAS01_Pierre_Gasly/pierregasly.png",
  esteban_ocon: "https://www.formula1.com/content/dam/fom-website/drivers/E/ESTOCO01_Esteban_Ocon/estebanocon.png",
  alexander_albon: "https://www.formula1.com/content/dam/fom-website/drivers/A/ALEALB01_Alexander_Albon/alexanderalbon.png",
  logan_sargeant: "https://www.formula1.com/content/dam/fom-website/drivers/L/LOGSAR01_Logan_Sargeant/logansargeant.png",
  valtteri_bottas: "https://www.formula1.com/content/dam/fom-website/drivers/V/VALBOT01_Valtteri_Bottas/valtteribottas.png",
  zhou_guanyu: "https://www.formula1.com/content/dam/fom-website/drivers/Z/ZHOGUA01_Zhou_Guanyu/zhouguanyu.png",
  kevin_magnussen: "https://www.formula1.com/content/dam/fom-website/drivers/K/KEVMAG01_Kevin_Magnussen/kevinmagnussen.png",
  nico_hulkenberg: "https://www.formula1.com/content/dam/fom-website/drivers/N/NICHUL01_Nico_Hulkenberg/nicohulkenberg.png",
};

// Team Logos Mapping
// Map constructorId from API to logo URL
export const TEAM_LOGOS: Record<string, string> = {
  red_bull: "https://www.formula1.com/content/dam/fom-website/teams/2024/red-bull-racing-logo.png",
  ferrari: "https://www.formula1.com/content/dam/fom-website/teams/2024/ferrari-logo.png",
  mercedes: "https://www.formula1.com/content/dam/fom-website/teams/2024/mercedes-logo.png",
  mclaren: "https://www.formula1.com/content/dam/fom-website/teams/2024/mclaren-logo.png",
  alpine: "https://www.formula1.com/content/dam/fom-website/teams/2024/alpine-logo.png",
  aston_martin: "https://www.formula1.com/content/dam/fom-website/teams/2024/aston-martin-logo.png",
  rb: "https://www.formula1.com/content/dam/fom-website/teams/2024/rb-logo.png",
  haas: "https://www.formula1.com/content/dam/fom-website/teams/2024/haas-logo.png",
  williams: "https://www.formula1.com/content/dam/fom-website/teams/2024/williams-logo.png",
  sauber: "https://www.formula1.com/content/dam/fom-website/teams/2024/sauber-logo.png",
};

// Team Colors Mapping
// Returns hex color code for each team
export function getTeamColor(teamName: string): string {
  const teamColors: Record<string, string> = {
    // Red Bull Racing
    "Red Bull Racing": "#0600EF",
    "Red Bull": "#0600EF",
    "red bull": "#0600EF",
    "red_bull": "#0600EF",
    
    // Ferrari
    "Ferrari": "#FF1801",
    "ferrari": "#FF1801",
    
    // Mercedes
    "Mercedes": "#00D2BE",
    "mercedes": "#00D2BE",
    
    // McLaren
    "McLaren": "#FF8700",
    "mclaren": "#FF8700",
    
    // Alpine
    "Alpine F1 Team": "#0090FF",
    "Alpine": "#0090FF",
    "alpine": "#0090FF",
    
    // Aston Martin
    "Aston Martin": "#00665E",
    "Aston Martin F1 Team": "#00665E",
    "aston_martin": "#00665E",
    "aston martin": "#00665E",
    
    // RB (Visa Cash App RB)
    "RB": "#003C6C",
    "Visa Cash App RB": "#003C6C",
    "rb": "#003C6C",
    
    // Haas
    "Haas F1 Team": "#FFFFFF",
    "Haas": "#FFFFFF",
    "haas": "#FFFFFF",
    
    // Williams
    "Williams": "#005AFF",
    "Williams F1": "#005AFF",
    "williams": "#005AFF",
    
    // Sauber (Stake F1 Team)
    "Sauber": "#52C41A",
    "Stake F1 Team": "#52C41A",
    "sauber": "#52C41A",
  };

  // Try exact match first
  if (teamColors[teamName]) {
    return teamColors[teamName];
  }

  // Try case-insensitive match
  const lowerTeamName = teamName.toLowerCase();
  for (const [key, value] of Object.entries(teamColors)) {
    if (key.toLowerCase() === lowerTeamName) {
      return value;
    }
  }

  // Default color if team not found
  return "#FFFFFF";
}

// Helper function to get driver image URL
export function getDriverImage(driverId: string): string | null {
  return DRIVER_IMAGES[driverId] || null;
}

// Helper function to get team logo URL
export function getTeamLogo(constructorId: string): string | null {
  return TEAM_LOGOS[constructorId] || null;
}

