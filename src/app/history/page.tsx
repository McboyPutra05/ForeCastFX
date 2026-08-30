/**
 * app/history/page.tsx
 * Route for the Historical Logs page.
 * Server Component: delegates UI rendering to HistoryPageUI.
 */

import { HistoryPageUI } from "@/pages/HistoryPageUI";
import { fetchAccuracySummary, fetchHistoricalReleases } from "@/lib/api/history";

export const dynamic = "force-dynamic";

export default async function HistoryPage() {
  try {
    const [accuracySummary, historyData] = await Promise.all([
      fetchAccuracySummary(),
      fetchHistoricalReleases()
    ]);
    
    return <HistoryPageUI accuracySummary={accuracySummary} initialHistoryData={historyData} />;
  } catch (error) {
    console.error("Failed to fetch history:", error);
    // Render the UI without data (or with empty fallback) if backend is down
    return <HistoryPageUI accuracySummary={null} initialHistoryData={{ releases: [], total: 0 }} />;
  }
}
