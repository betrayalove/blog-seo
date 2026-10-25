"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Hydration-safe client detection, without a second render from an effect. */
export function useMounted(): boolean {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
