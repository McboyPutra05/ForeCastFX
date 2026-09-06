/**
 * app/dashboard/page.tsx
 * Dashboard route — renders the main ForeCastFX dashboard.
 * Server Component: fetches prediction data and passes to UI components.
 */

import { fetchLatestPrediction } from "@/lib/api/predictions";
import { fetchUpcomingEvents } from "@/lib/api/calendar";
import type { LatestPrediction } from "@/types/prediction";
import { DashboardPageUI } from "@/pages/DashboardPageUI";

// ---------------------------------------------------------------------------
// Data fetcher
// ---------------------------------------------------------------------------
async function getPrediction(eventCode?: string): Promise<LatestPrediction | null> {
  try {
    return await fetchLatestPrediction(eventCode);
  } catch (error) {
    console.error("Failed to fetch prediction:", error);
    return null;
  }
}

async function getCalendarEvents() {
  try {
    const data = await fetchUpcomingEvents(50);
    return data.events || [];
  } catch (error) {
    console.error("Failed to fetch calendar events:", error);
    return [];
  }
}

// ---------------------------------------------------------------------------
// Dashboard Page
// ---------------------------------------------------------------------------
export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: Promise<{ event?: string }>;
}) {
  const resolvedParams = searchParams ? await searchParams : {};
  const eventCode = resolvedParams?.event || "NFP";

  const [prediction, calendarEvents] = await Promise.all([
    getPrediction(eventCode),
    getCalendarEvents(),
  ]);

  return <DashboardPageUI prediction={prediction} calendarEvents={calendarEvents} />;
}
