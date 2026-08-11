"use client";

/**
 * hooks/useCountdown.ts
 * Countdown timer hook — returns days/hours/minutes/seconds until a target datetime.
 * Uses JetBrains Mono font per StyleGuide.md spec.
 */

import { useCallback, useEffect, useRef, useState } from "react";

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  isExpired: boolean;
  /** Formatted string: "02D 14H 30M 45S" */
  formatted: string;
}

function computeCountdown(targetDate: Date): CountdownParts {
  const now = Date.now();
  const diff = targetDate.getTime() - now;

  if (diff <= 0) {
    return {
      days: 0, hours: 0, minutes: 0, seconds: 0,
      totalSeconds: 0, isExpired: true, formatted: "00D 00H 00M 00S",
    };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days    = Math.floor(totalSeconds / 86400);
  const hours   = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => String(n).padStart(2, "0");
  const formatted = `${pad(days)}D ${pad(hours)}H ${pad(minutes)}M ${pad(seconds)}S`;

  return { days, hours, minutes, seconds, totalSeconds, isExpired: false, formatted };
}

/**
 * Real-time countdown to a target date.
 *
 * @param targetDateStr ISO 8601 datetime string (UTC)
 * @param tickIntervalMs Interval in ms (default: 1000)
 */
export function useCountdown(
  targetDateStr: string | null | undefined,
  tickIntervalMs = 1000,
): CountdownParts {
  // Use getTime() so the dependency is a primitive number, not an object reference
  // This prevents infinite render loops caused by new Date() changing reference on every render
  const targetTime = targetDateStr ? new Date(targetDateStr).getTime() : null;

  const [countdown, setCountdown] = useState<CountdownParts>(() => {
    return targetTime
      ? computeCountdown(new Date(targetTime))
      : { days: 0, hours: 0, minutes: 0, seconds: 0, totalSeconds: 0, isExpired: true, formatted: "-- -- -- --" }
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const tick = useCallback(() => {
    if (!targetTime) return;
    setCountdown(computeCountdown(new Date(targetTime)));
  }, [targetTime]);

  useEffect(() => {
    if (!targetTime) return;

    tick(); // Run immediately
    intervalRef.current = setInterval(tick, tickIntervalMs);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [tick, tickIntervalMs, targetTime]);

  return countdown;
}
