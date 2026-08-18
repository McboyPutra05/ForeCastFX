import { Suspense } from "react";
import { HeroPredictionFrame } from "@/components/hero/HeroPredictionFrame";
import { EconomicCalendarTable } from "@/components/calendar/EconomicCalendarTable";
import type { LatestPrediction } from "@/types/prediction";
import { COLORS } from "@/lib/constants";

// ---------------------------------------------------------------------------
// Mock calendar events
// ---------------------------------------------------------------------------
const MOCK_CALENDAR = [
  { time: "08:30", currency: "USD", impact: "HIGH"   as const, event: "Non Farm Payrolls",           actual: "275K", forecast: "200K", previous: "229K", result: "BETTER"  as const, trendData: [0.3, 0.4, 0.4, 0.6, 1.0] },
  { time: "10:00", currency: "EUR", impact: "MEDIUM" as const, event: "ECB President Lagarde Speaks", actual: "—",    forecast: "—",    previous: "—",    result: "NEUTRAL" as const, trendData: [0.1, 0.1] },
  { time: "12:30", currency: "GBP", impact: "LOW"    as const, event: "BOE Consumer Credit",         actual: "1.2B", forecast: "1.5B", previous: "1.6B", result: "WORSE"   as const, trendData: [0.8, 0.7, 0.6, 0.5, 0.2] },
  { time: "14:00", currency: "USD", impact: "HIGH"   as const, event: "CPI m/m",                     actual: "0.4%", forecast: "0.3%", previous: "0.3%", result: "BETTER"  as const, trendData: [0.2, 0.2, 0.3, 0.3, 0.8] },
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex flex-col gap-3 p-5 rounded-xl border" style={{ backgroundColor: COLORS.cardSurface, borderColor: COLORS.border }}>
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">US Dollar Index</span>
              <span className="px-2 py-0.5 rounded-sm bg-[#10B981] text-white text-[10px] font-bold tracking-wider">BULLISH</span>
            </div>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-2xl font-bold text-white">104.25</span>
              <span className="text-xs font-bold text-[#34D399] mb-1">↑ +0.4%</span>
            </div>
            <div className="text-[10px] font-bold text-gray-500 mt-2">Strong correlation (+0.82)</div>
          </div>

          <div className="flex flex-col gap-3 p-5 rounded-xl border" style={{ backgroundColor: COLORS.cardSurface, borderColor: COLORS.border }}>
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">US 10Y Yield</span>
              <span className="px-2 py-0.5 rounded-sm bg-[#EF4444] text-white text-[10px] font-bold tracking-wider">BEARISH</span>
            </div>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-2xl font-bold text-white">4.32%</span>
              <span className="text-xs font-bold text-[#EF4444] mb-1">↓ -0.15%</span>
            </div>
            <div className="text-[10px] font-bold text-gray-500 mt-2">Moderate correlation (-0.45)</div>
          </div>

          <div className="flex flex-col gap-3 p-5 rounded-xl border" style={{ backgroundColor: COLORS.cardSurface, borderColor: COLORS.border }}>
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">ISM Services</span>
              <span className="px-2 py-0.5 rounded-sm bg-[#10B981] text-white text-[10px] font-bold tracking-wider">BULLISH</span>
            </div>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-2xl font-bold text-white">52.6</span>
              <span className="text-xs font-bold text-[#34D399] mb-1">↑ +1.2</span>
            </div>
            <div className="text-[10px] font-bold text-gray-500 mt-2">Expansion signals positive growth</div>
          </div>

          <div className="flex flex-col gap-3 p-5 rounded-xl border" style={{ backgroundColor: COLORS.cardSurface, borderColor: COLORS.border }}>
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Jobless Claims</span>
              <span className="px-2 py-0.5 rounded-sm bg-[#475569] text-white text-[10px] font-bold tracking-wider">NEUTRAL</span>
            </div>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-2xl font-bold text-white">215K</span>
              <span className="text-xs font-bold text-gray-400 mb-1">— 0K</span>
            </div>
            <div className="text-[10px] font-bold text-gray-500 mt-2">In line with historical averages</div>
          </div>
        </div>
      </section>
    </main>
  );
}
