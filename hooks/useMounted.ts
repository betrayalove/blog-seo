"use client";

import { useState, useEffect } from "react";

/**
 * Returns true after the component has mounted (client-side).
 * Useful to avoid hydration mismatch when reading theme/localStorage.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
