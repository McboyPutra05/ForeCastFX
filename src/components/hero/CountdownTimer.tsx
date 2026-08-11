"use client";

/**
 * components/hero/CountdownTimer.tsx
 * Real-time countdown timer displayed in the Hero Prediction Frame.
 * Uses JetBrains Mono font as specified in StyleGuide.md.
 */

import { useState, useEffect } from "react";
import { useCountdown } from "@/hooks/useCountdown";
import { COLORS } from "@/lib/constants";

interface CountdownTimerProps {
  /** ISO 8601 UTC datetime string for the release event */
  targetDate: string;
  className?: string;
}

export function CountdownTimer({ targetDate, className = "" }: CountdownTimerProps) {
  const { formatted, isExpired, days, hours, minutes, seconds } = useCountdown(targetDate);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div
        className={`flex items-center gap-3 ${className}`}
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
        aria-label="Loading countdown..."
      >
        <TimerBlock value={0} label="DAYS" />
        <TimerSep />
        <TimerBlock value={0} label="HRS" />
        <TimerSep />
        <TimerBlock value={0} label="MIN" />
        <TimerSep />
        <TimerBlock value={0} label="SEC" isSeconds />
      </div>
    );
  }

  if (isExpired) {
    return (
      <div
        className={`font-mono text-base font-bold uppercase tracking-widest animate-pulse ${className}`}
        style={{ color: COLORS.timerAmber, fontFamily: "'JetBrains Mono', monospace" }}
      >
        ⚡ RELEASE IN PROGRESS
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-3 ${className}`}
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
      aria-label={`Release countdown: ${formatted}`}
    >
      <TimerBlock value={days}    label="DAYS"    />
      <TimerSep />
      <TimerBlock value={hours}   label="HRS"     />
      <TimerSep />
      <TimerBlock value={minutes} label="MIN"     />
      <TimerSep />
      <TimerBlock value={seconds} label="SEC"     isSeconds />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function TimerBlock({
  value,
  label,
  isSeconds = false,
}: {
  value: number;
  label: string;
  isSeconds?: boolean;
}) {
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-0.5">
      <span
        className="tabular-nums leading-none font-bold"
        style={{
          fontSize: "clamp(20px, 2.5vw, 28px)",
          color: COLORS.timerAmber,
          /* Subtle pulse on seconds */
          transition: isSeconds ? "color 0.3s ease" : undefined,
        }}
      >
        {pad(value)}
      </span>
      <span
        className="uppercase tracking-widest font-semibold"
        style={{ fontSize: "9px", color: COLORS.textSecondary, letterSpacing: "0.15em" }}
      >
        {label}
      </span>
    </div>
  );
}

function TimerSep() {
  return (
    <span
      className="font-bold leading-none select-none"
      style={{
        fontSize: "22px",
        color: COLORS.timerAmber,
        opacity: 0.5,
        marginBottom: "12px",
      }}
    >
      :
    </span>
  );
}
