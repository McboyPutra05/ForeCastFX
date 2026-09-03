"use client";

import { Suspense } from "react";
import { HeroPredictionFrame } from "@/components/hero/HeroPredictionFrame";
import { EconomicCalendarTable } from "@/components/calendar/EconomicCalendarTable";
import type { LatestPrediction } from "@/types/prediction";
import { COLORS } from "@/lib/constants";

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

export function DashboardPageUI({
  prediction,
  calendarEvents = [],
}: {
  prediction: LatestPrediction | null;
  calendarEvents?: any[];
}) {
  // Format live calendar events to match component's expected structure
  const formattedCalendar = calendarEvents.map(evt => {
    const d = new Date(evt.release_date);
    return {
      date: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      release_date: evt.release_date,
      time: d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
      currency: evt.country_code === "US" ? "USD" : evt.country_code,
      impact: evt.impact as any,
      event: evt.event_name,
      actual: evt.actual_value !== null && evt.actual_value !== undefined ? String(evt.actual_value) : "—",
      forecast: evt.forecast_value !== null && evt.forecast_value !== undefined ? String(evt.forecast_value) : "—",
      previous: evt.previous_value !== null && evt.previous_value !== undefined ? String(evt.previous_value) : "—",
      result: (evt.bias_recommendation || "NEUTRAL") as any,
      trendData: [0.5, 0.5, 0.5]
    };
  });

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
        {prediction ? (
          <HeroPredictionFrame prediction={prediction} />
        ) : (
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
            No upcoming predictions available at the moment.
          </div>
        )}
      </Suspense>

      {/* ------------------------------------------------------------------ */}
      {/* Leading Indicators Analysis — Cheat Sheet per IndicatorAnalysisFullNews.md */}
      {/* ------------------------------------------------------------------ */}
      <section aria-label="Leading Indicators Analysis">
        <SectionHeader
          title="Leading Indicators Analysis"
          subtitle={
            prediction
              ? `Fundamental leading factors influencing the ${prediction.event_name} prediction`
              : "Factors influencing macroeconomic predictions"
          }
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {prediction?.leading_indicators?.length ? (
            prediction.leading_indicators.map((ind: any, idx: number) => (
              <div
                key={idx}
                className="flex flex-col justify-between p-5 rounded-xl border transition-all hover:border-gray-600"
                style={{
                  backgroundColor: COLORS.cardSurface,
                  borderColor: COLORS.border,
                }}
              >
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[11px] font-bold text-gray-300 uppercase tracking-wider line-clamp-2">
                      {ind.name}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded text-white text-[10px] font-bold tracking-wider shrink-0"
                      style={{ backgroundColor: ind.bg }}
                    >
                      {ind.signal}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2.5 mt-3">
                    <span className="text-2xl font-black text-white tracking-tight">
                      {ind.value}
                    </span>
                    <span
                      className="text-xs font-extrabold"
                      style={{ color: ind.color }}
                    >
                      {ind.change}
                    </span>
                  </div>
                </div>
                <div className="text-[11px] font-medium text-gray-400 mt-4 leading-relaxed border-t border-[#1F293D] pt-3">
                  {ind.desc}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-8 text-center text-sm text-gray-500 border border-dashed border-[#1F293D] rounded-xl">
              No leading indicators available for this event yet.
            </div>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Upcoming Economic Calendar                                          */}
      {/* ------------------------------------------------------------------ */}
      <section aria-label="Upcoming High Impact Economic Events">
        <SectionHeader
          title="Upcoming Economic Events"
          subtitle="High Impact US macroeconomic releases — sorted by schedule (Forex Factory Timings)"
        />
        <EconomicCalendarTable events={formattedCalendar} />
      </section>
    </main>
  );
}

export default DashboardPageUI;
