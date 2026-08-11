import { Suspense } from "react";
import { HeroPredictionFrame } from "@/components/hero/HeroPredictionFrame";
import { EconomicCalendarTable } from "@/components/calendar/EconomicCalendarTable";
import type { LatestPrediction } from "@/types/prediction";
import { COLORS } from "@/lib/constants";

// ---------------------------------------------------------------------------
// Mock calendar events
// ---------------------------------------------------------------------------
const MOCK_CALENDAR = [
  { time: "12:30 UTC", event: "Consumer Price Index (CPI)",  impact: "HIGH"   as const, previous: "3.0%",  forecast: "3.1%",  bias: "BUY"   as const },
  { time: "12:30 UTC", event: "Non-Farm Payrolls (NFP)",     impact: "HIGH"   as const, previous: "175K",  forecast: "185K",  bias: "BUY"   as const },
  { time: "14:00 UTC", event: "ISM Manufacturing PMI",       impact: "HIGH"   as const, previous: "48.7",  forecast: "49.5",  bias: "SELL"  as const },
  { time: "14:30 UTC", event: "Initial Jobless Claims",      impact: "HIGH"   as const, previous: "212K",  forecast: "215K",  bias: "WATCH" as const },
  { time: "20:00 UTC", event: "FOMC Meeting Minutes",        impact: "HIGH"   as const, previous: "—",     forecast: "—",     bias: "WATCH" as const },
  { time: "12:30 UTC", event: "Retail Sales MoM",            impact: "MEDIUM" as const, previous: "0.2%",  forecast: "0.4%",  bias: "BUY"   as const },
];

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex flex-col gap-0.5 mb-4">
      <h2 style={{ fontSize: "20px", fontWeight: 600, color: COLORS.textPrimary }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ fontSize: "13px", color: COLORS.textSecondary }}>{subtitle}</p>
      )}
    </div>
  );
}

export function DashboardPageUI({ prediction }: { prediction: LatestPrediction }) {
  return (
    <main
      className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-8"
      style={{ backgroundColor: COLORS.backgroundPrimary }}
    >
      {/* ------------------------------------------------------------------ */}
      {/* Hero Prediction Frame — TOPMOST, FULL WIDTH (HIGH PRIORITY)        */}
      {/* ------------------------------------------------------------------ */}
      <Suspense
        fallback={
          <div
            style={{
              backgroundColor: COLORS.cardSurface,
              border: `3px solid ${COLORS.border}`,
              borderRadius: "12px",
              padding: "40px",
              height: "280px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: COLORS.textSecondary,
              fontSize: "13px",
            }}
          >
            Loading prediction signal...
          </div>
        }
      >
        <HeroPredictionFrame prediction={prediction} />
      </Suspense>

      {/* ------------------------------------------------------------------ */}
      {/* Upcoming Economic Calendar                                          */}
      {/* ------------------------------------------------------------------ */}
      <section aria-label="Upcoming High Impact Economic Events">
        <SectionHeader
          title="Upcoming Economic Events"
          subtitle="High Impact US macroeconomic releases — sorted by schedule"
        />
        <EconomicCalendarTable events={MOCK_CALENDAR} />
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Leading Indicators Analysis — Phase 2                              */}
      {/* ------------------------------------------------------------------ */}
      <section aria-label="Leading Indicators Analysis">
        <SectionHeader
          title="Leading Indicators Analysis"
          subtitle={`Factors influencing the next ${prediction.event_code} prediction`}
        />
        <div
          style={{
            backgroundColor: COLORS.cardSurface,
            border: `1px solid ${COLORS.border}`,
            borderRadius: "12px",
            padding: "24px",
            color: COLORS.textSecondary,
            fontSize: "13px",
            fontStyle: "italic",
          }}
        >
          Leading indicators cluster analysis — implementation in Phase 2.
        </div>
      </section>
    </main>
  );
}
