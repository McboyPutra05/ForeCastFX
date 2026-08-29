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
async function getPrediction(): Promise<LatestPrediction | null> {
  try {
    return await fetchLatestPrediction();
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
export default async function DashboardPage() {
  // 1. Fetch data on the server
  const [prediction, calendarEvents] = await Promise.all([
    getPrediction(),
    getCalendarEvents()
  ]);

  // 2. Delegate UI rendering to the clean components/pages folder
  return <DashboardPageUI prediction={prediction} calendarEvents={calendarEvents} />;
}
