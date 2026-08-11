/**
 * types/history.ts
 * TypeScript types for Historical Releases & Accuracy Logs.
 */

import type { EconomicEvent } from "./calendar";
import type { SignalDirection, UsdSentiment } from "./prediction";

export interface HistoricalRelease {
  id: string;
  event: EconomicEvent;
  release_date: string;
  period_label: string | null;
  previous_value: number | null;
  forecast_value: number | null;
  actual_value: number | null;
  /** Computed: actual_value - forecast_value */
  deviation: number | null;
  usd_outcome: UsdSentiment | null;
  is_released: boolean;
}

export interface HistoricalReleaseWithPrediction extends HistoricalRelease {
  prediction: {
    signal: SignalDirection;
    confidence_score: number;
    is_correct: boolean | null;
  } | null;
}

export interface AccuracySummaryByEvent {
  event_code: string;
  event_name: string;
  total_predictions: number;
  correct_predictions: number;
  accuracy_pct: number;
  avg_confidence_score: number;
}

export interface AccuracySummaryResponse {
  accuracy_by_event: AccuracySummaryByEvent[];
  overall_accuracy_pct: number | null;
}

export interface HistoryListResponse {
  releases: HistoricalReleaseWithPrediction[];
  total: number;
  page: number;
  page_size: number;
}

export interface HistoryFilters {
  event_code?: string;
  date_from?: string;
  date_to?: string;
  page: number;
  page_size: number;
}
