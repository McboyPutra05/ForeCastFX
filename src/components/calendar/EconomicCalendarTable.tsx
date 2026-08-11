"use client";

/**
 * components/calendar/EconomicCalendarTable.tsx
 * Economic Calendar Table — Client Component for hover interactions.
 * Displays upcoming High Impact US economic events.
 */

import { COLORS } from "@/lib/constants";

interface CalendarEvent {
  time: string;
  event: string;
  impact: "HIGH" | "MEDIUM" | "LOW";
  previous: string;
  forecast: string;
  bias: "BUY" | "SELL" | "WATCH" | "NEUTRAL";
}

interface EconomicCalendarTableProps {
  events: CalendarEvent[];
}

const IMPACT_BG: Record<string, string> = {
  HIGH:   "#DC2626",
  MEDIUM: "#D97706",
  LOW:    "#2563EB",
};

const BIAS_COLOR: Record<string, string> = {
  BUY:     "#10B981",
  SELL:    "#EF4444",
  WATCH:   "#F59E0B",
  NEUTRAL: "#94A3B8",
};

export function EconomicCalendarTable({ events }: EconomicCalendarTableProps) {
  return (
    <div
      style={{
        backgroundColor: COLORS.cardSurface,
        border: `1px solid ${COLORS.border}`,
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      {/* Table header */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: "110px 1fr 100px 90px 90px 90px",
          backgroundColor: "#182232",
          padding: "10px 20px",
        }}
      >
        {["TIME (UTC)", "EVENT", "IMPACT", "PREVIOUS", "FORECAST", "BIAS"].map((h) => (
          <span
            key={h}
            style={{
              fontSize: "9px",
              fontWeight: 600,
              color: COLORS.textSecondary,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            {h}
          </span>
        ))}
      </div>

      {/* Table rows */}
      {events.map((ev, i) => (
        <CalendarRow key={i} event={ev} />
      ))}
    </div>
  );
}

function CalendarRow({ event: ev }: { event: CalendarEvent }) {
  return (
    <div
      className="grid items-center transition-colors duration-150"
      style={{
        gridTemplateColumns: "110px 1fr 100px 90px 90px 90px",
        padding: "12px 20px",
        borderTop: `1px solid ${COLORS.border}`,
        cursor: "pointer",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1E293B")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
    >
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "12px",
          color: COLORS.textSecondary,
        }}
      >
        {ev.time}
      </span>

      <span style={{ fontSize: "13px", color: COLORS.textPrimary, fontWeight: 500 }}>
        {ev.event}
      </span>

      <span>
        <span
          style={{
            backgroundColor: IMPACT_BG[ev.impact] ?? "#666",
            color: "#fff",
            fontSize: "9px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            padding: "2px 8px",
            borderRadius: "4px",
          }}
        >
          {ev.impact}
        </span>
      </span>

      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "12px",
          color: COLORS.textSecondary,
        }}
      >
        {ev.previous}
      </span>

      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "12px",
          color: COLORS.textPrimary,
        }}
      >
        {ev.forecast}
      </span>

      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "11px",
          fontWeight: 700,
          color: BIAS_COLOR[ev.bias] ?? COLORS.textSecondary,
        }}
      >
        {ev.bias}
      </span>
    </div>
  );
}
