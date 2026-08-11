/**
 * lib/constants.ts
 * Design system constants derived from StyleGuide.md
 * Single source of truth for colors, labels, and config values.
 */

import type { ImpactLevel } from "@/types/calendar";
import type { SignalDirection } from "@/types/prediction";

// ---------------------------------------------------------------------------
// Signal Colors (from StyleGuide.md — SOLID colors, NO gradients)
// ---------------------------------------------------------------------------

export const SIGNAL_COLORS: Record<SignalDirection, string> = {
  BUY:     "#10B981", // Solid Emerald Green — Bullish Gold / Bad for USD
  SELL:    "#EF4444", // Solid Coral Red    — Bearish Gold / Good for USD
  NEUTRAL: "#F59E0B", // Solid Amber Gold   — No clear bias
};

/** Returns Tailwind-compatible inline style for Hero Frame border */
export const HERO_BORDER_COLOR: Record<SignalDirection, string> = {
  BUY:     "#10B981",
  SELL:    "#EF4444",
  NEUTRAL: "#1F293D",
};

// ---------------------------------------------------------------------------
// Impact Badge Colors
// ---------------------------------------------------------------------------

export const IMPACT_COLORS: Record<ImpactLevel, { bg: string; text: string }> = {
  HIGH:   { bg: "#DC2626", text: "#FFFFFF" }, // Solid Dark Red
  MEDIUM: { bg: "#D97706", text: "#FFFFFF" }, // Solid Dark Amber
  LOW:    { bg: "#2563EB", text: "#FFFFFF" }, // Solid Slate Blue
};

// ---------------------------------------------------------------------------
// Typography — matches StyleGuide.md font sizes
// ---------------------------------------------------------------------------

export const TYPOGRAPHY = {
  heroSignal:  "clamp(60px, 6vw, 72px)", // BUY/SELL hero text: 60–72pt Extra Bold
  heroTitle:   "24px",                    // Event name in Hero Frame
  heading1:    "20px",                    // Section headers
  heading2:    "16px",                    // Card titles
  body:        "13px",                    // Table content
  caption:     "10px",                    // Badges, labels
} as const;

// ---------------------------------------------------------------------------
// Design Tokens (from StyleGuide.md)
// ---------------------------------------------------------------------------

export const COLORS = {
  backgroundPrimary:  "#090D16", // Deep Charcoal Black
  cardSurface:        "#121826", // Dark Navy Slate
  border:             "#1F293D", // Subtle Cool Grey
  tableHeader:        "#182232",
  tableRowHover:      "#1E293B",
  textPrimary:        "#F8FAFC", // Pure Off-White
  textSecondary:      "#94A3B8", // Slate Grey
  timerAmber:         "#F59E0B", // JetBrains Mono timer color
} as const;

// ---------------------------------------------------------------------------
// Signal Labels
// ---------------------------------------------------------------------------

export const SIGNAL_LABELS: Record<SignalDirection, string> = {
  BUY:     "BUY XAUUSD",
  SELL:    "SELL XAUUSD",
  NEUTRAL: "NEUTRAL",
};

// ---------------------------------------------------------------------------
// API Config
// ---------------------------------------------------------------------------

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

/** Hero Frame prediction polling interval (ms) */
export const PREDICTION_POLL_INTERVAL_MS = 30_000;
