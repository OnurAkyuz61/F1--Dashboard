#!/usr/bin/env node
/**
 * Generates track-layout SVGs into public/circuits/<ergastCircuitId>.svg
 *
 * Source geometry: bacinger/f1-circuits (MIT License, © Tomislav Bacinger)
 * https://github.com/bacinger/f1-circuits
 *
 * Usage:
 *   node scripts/generate-circuit-svgs.mjs            # downloads the GeoJSON
 *   node scripts/generate-circuit-svgs.mjs file.geojson
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SOURCE_URL =
  "https://raw.githubusercontent.com/bacinger/f1-circuits/master/f1-circuits.geojson";

// bacinger id -> Ergast/Jolpi circuitId
const ID_MAP = {
  "au-1953": "albert_park",
  "bh-2002": "bahrain",
  "cn-2004": "shanghai",
  "es-1991": "catalunya",
  "mc-1929": "monaco",
  "ca-1978": "villeneuve",
  "fr-1969": "ricard",
  "at-1969": "red_bull_ring",
  "gb-1948": "silverstone",
  "de-1932": "hockenheimring",
  "hu-1986": "hungaroring",
  "be-1925": "spa",
  "it-1922": "monza",
  "sg-2008": "marina_bay",
  "ru-2014": "sochi",
  "jp-1962": "suzuka",
  "us-2012": "americas",
  "mx-1962": "rodriguez",
  "br-1940": "interlagos",
  "ae-2009": "yas_marina",
  "it-1953": "imola",
  "de-1927": "nurburgring",
  "pt-2008": "portimao",
  "it-1914": "mugello",
  "my-1999": "sepang",
  "tr-2005": "istanbul",
  "nl-1948": "zandvoort",
  "sa-2021": "jeddah",
  "us-2022": "miami",
  "qa-2004": "losail",
  "es-2026": "madring",
  "az-2016": "baku",
  "us-2023": "vegas",
};

const W = 400;
const H = 300;
const PAD = 24;

function project(coords) {
  const lat0 =
    (coords.reduce((s, c) => s + c[1], 0) / coords.length) * (Math.PI / 180);
  const k = Math.cos(lat0);
  const pts = coords.map(([lon, lat]) => [lon * k, -lat]);
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  const scale = Math.min((W - PAD * 2) / (maxX - minX), (H - PAD * 2) / (maxY - minY));
  const offX = (W - (maxX - minX) * scale) / 2;
  const offY = (H - (maxY - minY) * scale) / 2;
  return pts.map(([x, y]) => [
    +(offX + (x - minX) * scale).toFixed(1),
    +(offY + (y - minY) * scale).toFixed(1),
  ]);
}

function toSvg(name, coords) {
  const pts = project(coords);
  const d = "M" + pts.map((p) => p.join(",")).join("L") + "Z";
  const [sx, sy] = pts[0];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${name} track layout">
  <title>${name}</title>
  <path d="${d}" fill="none" stroke="#FF1801" stroke-opacity="0.35" stroke-width="14" stroke-linejoin="round" stroke-linecap="round"/>
  <path d="${d}" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>
  <circle cx="${sx}" cy="${sy}" r="7" fill="#FF1801" stroke="#FFFFFF" stroke-width="2.5"/>
</svg>
`;
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "circuits");

const input = process.argv[2];
const geojson = input
  ? JSON.parse(await readFile(input, "utf8"))
  : await (await fetch(SOURCE_URL)).json();

await mkdir(outDir, { recursive: true });
let count = 0;
for (const f of geojson.features) {
  const id = ID_MAP[f.properties.id];
  if (!id || f.geometry?.type !== "LineString") continue;
  await writeFile(path.join(outDir, `${id}.svg`), toSvg(f.properties.Name, f.geometry.coordinates));
  count++;
}
console.log(`Wrote ${count} circuit SVGs to ${path.relative(root, outDir)}`);
