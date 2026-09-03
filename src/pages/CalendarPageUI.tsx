import { COLORS } from "@/lib/constants";
import { EconomicCalendarTable } from "@/components/calendar/EconomicCalendarTable";

// MOCK_CALENDAR removed - using live data from DB

export function CalendarPageUI({ calendarEvents = [] }: { calendarEvents?: any[] }) {
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
      actual: "—", // Upcoming events don't have actuals yet
      forecast: evt.forecast_value ? String(evt.forecast_value) : "—",
      previous: evt.previous_value ? String(evt.previous_value) : "—",
      result: "NEUTRAL" as const,
      trendData: [0.5, 0.5, 0.5] // Stub trend
    };
  });

  return (
    <main
      className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-8"
      style={{ backgroundColor: COLORS.backgroundPrimary }}
    >
      <div className="flex flex-col gap-0.5 mb-4">
        <h2 style={{ fontSize: "20px", fontWeight: 600, color: COLORS.textPrimary }}>
          Full Economic Calendar
        </h2>
        <p style={{ fontSize: "13px", color: COLORS.textSecondary }}>
          Historical and upcoming macroeconomic events
        </p>
      </div>

      <EconomicCalendarTable events={formattedCalendar} />
    </main>
  );
}

export default CalendarPageUI;
