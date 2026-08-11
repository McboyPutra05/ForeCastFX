"use client";

/**
 * components/hero/ConfidenceBadge.tsx
 * Solid badge displaying the engine confidence score (0–100%).
 * Follows StyleGuide.md: solid background fill, no gradients.
 */

import type { SignalDirection } from "@/types/prediction";
import { SIGNAL_COLORS } from "@/lib/constants";

interface ConfidenceBadgeProps {
  score: number;
  signal: SignalDirection;
  className?: string;
}

export function ConfidenceBadge({ score, signal, className = "" }: ConfidenceBadgeProps) {
  const color = SIGNAL_COLORS[signal];

  /** Visual tier label for context */
  const tier =
    score >= 75 ? "HIGH CONVICTION" :
    score >= 55 ? "MODERATE"        :
    score >= 35 ? "LOW"             :
                  "WEAK";

  return (
    <div
      className={`inline-flex flex-col items-center gap-0.5 px-4 py-2 ${className}`}
      style={{
        backgroundColor: `${color}1A`,  // 10% opacity of signal color — solid tint
        border: `1px solid ${color}`,
        borderRadius: "8px",
      }}
    >
      <span
        className="font-mono font-bold tabular-nums"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "clamp(18px, 2vw, 22px)",
          color: color,
          lineHeight: 1,
        }}
      >
        {score.toFixed(1)}%
      </span>
      <span
        className="uppercase tracking-widest font-semibold"
        style={{ fontSize: "9px", color: color, opacity: 0.8 }}
      >
        {tier} CONFIDENCE
      </span>
    </div>
  );
}
