"use client";

import { useState, useEffect, useCallback } from "react";
import { COLORS } from "@/lib/constants";
import { EconomicCalendarTable } from "@/components/calendar/EconomicCalendarTable";
import { fetchUpcomingEvents } from "@/lib/api/calendar";
import { RefreshCw, Calendar as CalendarIcon } from "lucide-react";

export function CalendarPageUI({ calendarEvents: initialEvents = [] }: { calendarEvents?: any[] }) {
  const [events, setEvents] = useState(initialEvents);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const refreshCalendar = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const data = await fetchUpcomingEvents(100, true, "this_month");
      if (data && data.events) {
        setEvents(data.events);
      }
    } catch (err) {
      console.error("Failed to refresh calendar events:", err);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // Auto-polling every 15 seconds to catch newly released actual numbers in real-time
  useEffect(() => {
    const timer = setInterval(() => {
      refreshCalendar();
    }, 15000);
    return () => clearInterval(timer);
  }, [refreshCalendar]);

  // Format live calendar events to match component's expected structure
  const formattedCalendar = events.map((evt) => {
    const d = new Date(evt.release_date);

    let result: "BETTER" | "WORSE" | "NEUTRAL" | undefined = undefined;
    if (evt.is_released && evt.actual_value !== null && evt.forecast_value !== null) {
      const dev = evt.deviation !== null ? evt.deviation : evt.actual_value - evt.forecast_value;
      const isUnemp =
        evt.event_name?.toLowerCase().includes("unemployment") ||
        evt.event?.event_code === "UNEMPLOYMENT";

      if (isUnemp) {
        result = dev < 0 ? "BETTER" : dev > 0 ? "WORSE" : "NEUTRAL";
      } else {
        result = dev > 0 ? "BETTER" : dev < 0 ? "WORSE" : "NEUTRAL";
      }
    }

    return {
      date: d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
      release_date: evt.release_date,
      time: d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }),
      currency: evt.country_code === "US" ? "USD" : evt.country_code || "USD",
      impact: evt.impact as any,
      event: evt.event_name || evt.event?.event_name,
      actual: evt.actual_value !== null && evt.actual_value !== undefined ? String(evt.actual_value) : "—",
      forecast: evt.forecast_value !== null && evt.forecast_value !== undefined ? String(evt.forecast_value) : "—",
      previous: evt.previous_value !== null && evt.previous_value !== undefined ? String(evt.previous_value) : "—",
      result: result,
      trendData: [0.5, 0.5, 0.5],
    };
  });

  return (
    <main
      className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6"
      style={{ backgroundColor: COLORS.backgroundPrimary }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b" style={{ borderColor: COLORS.border }}>
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-emerald-400" />
            Full US Economic Calendar
          </h1>
          <p className="text-xs text-gray-400">
            Realtime verified macroeconomic schedule, live release actuals, and forecast consensus
          </p>
        </div>

        <button
          onClick={refreshCalendar}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#121826] border border-[#1F293D] text-gray-300 hover:text-white hover:bg-[#1E293B] transition-all disabled:opacity-50 self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-emerald-400" : ""}`} />
          <span>{isRefreshing ? "Syncing..." : "Sync Calendar"}</span>
        </button>
      </div>

      <EconomicCalendarTable events={formattedCalendar} />
    </main>
  );
}

export default CalendarPageUI;
