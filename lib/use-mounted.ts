"use client";

import { useEffect, useState } from "react";

/**
 * True only after the first client render. Use it to render
 * timezone-dependent text (local race times) without SSR hydration
 * mismatches — the server renders in UTC, the browser in local time.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
