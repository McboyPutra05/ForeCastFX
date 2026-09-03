/**
 * app/page.tsx
 * Root route — renders the main Info Trader dashboard.
 * Server Component: fetches prediction data and passes to UI components.
 */

import { fetchLatestPrediction } from "@/lib/api/predictions";
import { fetchUpcomingEvents } from "@/lib/api/calendar";
import type { LatestPrediction } from "@/types/prediction";
import { DashboardPageUI } from "@/pages/DashboardPageUI";

// ---------------------------------------------------------------------------
// Data fetcher
// ---------------------------------------------------------------------------
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
    const data = await fetchUpcomingEvents(50); // Fetch enough events so client-side filters work correctly
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
  // Default to NFP as primary featured event per trader focus
  const eventCode = resolvedParams?.event || "NFP";

  // 1. Fetch data on the server
  const [prediction, calendarEvents] = await Promise.all([
    getPrediction(eventCode),
    getCalendarEvents(),
  ]);

  // 2. Delegate UI rendering to the clean components/pages folder
  return <DashboardPageUI prediction={prediction} calendarEvents={calendarEvents} />;
}
