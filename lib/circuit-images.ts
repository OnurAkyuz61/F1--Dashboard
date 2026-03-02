// Circuit layout / track images for popup display
// Uses Wikimedia Commons and placeholder where no image available
import { getCircuitId } from "./circuit-data";

const WIKI = "https://upload.wikimedia.org/wikipedia/commons";

export const CIRCUIT_IMAGES: Record<string, string> = {
  albert_park: `${WIKI}/thumb/0/0d/Albert_Park_Circuit_2022.svg/400px-Albert_Park_Circuit_2022.svg.png`,
  bahrain: `${WIKI}/thumb/6/6a/Bahrain_International_Circuit.svg/400px-Bahrain_International_Circuit.svg.png`,
  jeddah: `${WIKI}/thumb/2/2e/Jeddah_Corniche_Circuit_2021.svg/400px-Jeddah_Corniche_Circuit_2021.svg.png`,
  miami: `${WIKI}/thumb/2/2b/Miami_International_Autodrome_2022.svg/400px-Miami_International_Autodrome_2022.svg.png`,
  imola: `${WIKI}/thumb/2/2a/Autodromo_Enzo_e_Dino_Ferrari_-_Layout_2020.svg/400px-Autodromo_Enzo_e_Dino_Ferrari_-_Layout_2020.svg.png`,
  monaco: `${WIKI}/thumb/f/f2/Circuit_de_Monaco.svg/400px-Circuit_de_Monaco.svg.png`,
  catalunya: `${WIKI}/thumb/2/2b/Circuit_de_Barcelona-Catalunya.svg/400px-Circuit_de_Barcelona-Catalunya.svg.png`,
  villeneuve: `${WIKI}/thumb/2/2e/Circuit_Gilles_Villeneuve.svg/400px-Circuit_Gilles_Villeneuve.svg.png`,
  red_bull_ring: `${WIKI}/thumb/5/5a/Red_Bull_Ring_2020.svg/400px-Red_Bull_Ring_2020.svg.png`,
  silverstone: `${WIKI}/thumb/2/2b/Silverstone_Circuit_2020.svg/400px-Silverstone_Circuit_2020.svg.png`,
  shanghai: `${WIKI}/thumb/4/4d/Shanghai_International_Circuit.svg/400px-Shanghai_International_Circuit.svg.png`,
  suzuka: `${WIKI}/thumb/6/6a/Suzuka_Circuit_2014.svg/400px-Suzuka_Circuit_2014.svg.png`,
};

// Fallback: aerial race track / circuit vibe
export const DEFAULT_CIRCUIT_IMAGE =
  "https://images.unsplash.com/photo-1541443131876-44b03de101c5?w=800&q=80";

export function getCircuitImageUrl(circuitName: string): string {
  const circuitId = getCircuitId(circuitName);
  if (!circuitId || !CIRCUIT_IMAGES[circuitId]) {
    return DEFAULT_CIRCUIT_IMAGE;
  }
  return CIRCUIT_IMAGES[circuitId];
}
