import { COLORS } from "@/lib/constants";
import { EconomicCalendarTable } from "@/components/calendar/EconomicCalendarTable";

const FULL_MOCK_CALENDAR = [
  { time: "08:30", currency: "USD", impact: "HIGH"   as const, event: "Non Farm Payrolls",           actual: "275K", forecast: "200K", previous: "229K", result: "BETTER"  as const, trendData: [0.3, 0.4, 0.4, 0.6, 1.0] },
  { time: "10:00", currency: "EUR", impact: "MEDIUM" as const, event: "ECB President Lagarde Speaks", actual: "—",    forecast: "—",    previous: "—",    result: "NEUTRAL" as const, trendData: [0.1, 0.1] },
  { time: "12:30", currency: "GBP", impact: "LOW"    as const, event: "BOE Consumer Credit",         actual: "1.2B", forecast: "1.5B", previous: "1.6B", result: "WORSE"   as const, trendData: [0.8, 0.7, 0.6, 0.5, 0.2] },
  { time: "14:00", currency: "USD", impact: "HIGH"   as const, event: "CPI m/m",                     actual: "0.4%", forecast: "0.3%", previous: "0.3%", result: "BETTER"  as const, trendData: [0.2, 0.2, 0.3, 0.3, 0.8] },
  { time: "15:30", currency: "CAD", impact: "MEDIUM" as const, event: "Retail Sales m/m",            actual: "—",    forecast: "0.2%", previous: "0.4%", result: "NEUTRAL" as const, trendData: [0.5, 0.7, 0.6, 0.5, 0.3] },
  { time: "19:00", currency: "NZD", impact: "LOW"    as const, event: "GDT Price Index",             actual: "—",    forecast: "—",    previous: "-2.3%",result: "NEUTRAL" as const, trendData: [0.3, 0.4, 0.2, 0.5, 0.6] },
];

export function CalendarPageUI() {
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

      <EconomicCalendarTable events={FULL_MOCK_CALENDAR} />
    </main>
  );
}
