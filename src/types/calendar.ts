/**
 * types/calendar.ts
 * TypeScript types for Economic Calendar data.
 */

export type ImpactLevel = "HIGH" | "MEDIUM" | "LOW";

export type BiasRecommendation = "BUY" | "SELL" | "NEUTRAL" | "WATCH";

export interface EconomicEvent {
  id: string;
  event_name: string;
  event_code: string;
  description: string | null;
  impact: ImpactLevel;
  country_code: string;
  source_api: string | null;
  is_active: boolean;
}

/**
 * An upcoming release row — used in the Economic Calendar Table.
 * Includes event metadata + Previous/Forecast values.
 */
export interface UpcomingRelease {
  id: string;
  event: EconomicEvent;
  /** Scheduled release datetime (ISO 8601 UTC) */
  release_date: string;
  /** e.g. "Jun 2025" */
  period_label: string | null;
  previous_value: number | null;
  forecast_value: number | null;
  /** Present if system has already generated a prediction for this release */
  bias_recommendation: BiasRecommendation | null;
  confidence_score: number | null;
}

export interface CalendarListResponse {
  events: UpcomingRelease[];
  total: number;
}
