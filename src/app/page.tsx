/**
 * app/page.tsx
 * Root route — renders the main Info Trader dashboard.
 * Server Component: fetches prediction data and passes to UI components.
 */

import { fetchLatestPrediction } from "@/lib/api/predictions";
import type { LatestPrediction } from "@/types/prediction";
import { DashboardPageUI } from "@/components/pages/DashboardPageUI";

// ---------------------------------------------------------------------------
// Mock data for development (until backend is live)
// ---------------------------------------------------------------------------
const MOCK_PREDICTION: LatestPrediction = {
  signal: "BUY",
  signal_label: "BUY XAUUSD",
  signal_subtitle: "Predicted Bias: BAD FOR USD (Dovish CPI)",
  confidence_score: 72.5,
  event_name: "US Consumer Price Index (CPI)",
  event_code: "CPI",
  release_date: new Date(Date.now() + 86400 * 1000 * 2).toISOString(),
  countdown_seconds: 86400 * 2,
  composite_score: -0.41,
  engine_metadata: {
    indicators: [
      { code: "PPI",          weight: 0.45, actual: 2.1,  forecast: 2.5,  deviation: -0.4, raw_score: -0.16,  weighted_score: -0.072  },
      { code: "ISM_MFG",      weight: 0.30, actual: 48.8, forecast: 50.2, deviation: -1.4, raw_score: -0.028, weighted_score: -0.0084 },
      { code: "RETAIL_SALES", weight: 0.25, actual: -0.2, forecast: 0.3,  deviation: -0.5, raw_score: -1.0,   weighted_score: -0.25   },
    ],
  },
};

// ---------------------------------------------------------------------------
// Data fetcher with mock fallback
// ---------------------------------------------------------------------------
async function getPrediction(): Promise<LatestPrediction> {
  try {
    return await fetchLatestPrediction();
  } catch {
    return MOCK_PREDICTION;
  }
}

// ---------------------------------------------------------------------------
// Dashboard Page
// ---------------------------------------------------------------------------
export default async function DashboardPage() {
  // 1. Fetch data on the server
  const prediction = await getPrediction();

  // 2. Delegate UI rendering to the clean components/pages folder
  return <DashboardPageUI prediction={prediction} />;
}
