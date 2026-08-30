/**
 * types/prediction.ts
 * TypeScript types for the Prediction Engine output.
 * Maps to the /api/v1/predictions/latest response schema.
 */

export type SignalDirection = "BUY" | "SELL" | "NEUTRAL";

export type UsdSentiment = "GOOD_FOR_USD" | "BAD_FOR_USD" | "NEUTRAL";

export interface IndicatorBreakdown {
  code: string;
  weight: number;
  actual: number;
  forecast: number;
  deviation: number;
  raw_score: number;
  weighted_score: number;
}

export interface EngineMetadata {
  indicators: IndicatorBreakdown[];
}

export interface LeadingIndicator {
  name: string;
  signal: string;
  value: string;
  change: string;
  color: string;
  bg: string;
  desc: string;
}

/**
 * Full prediction result for the Hero Prediction Frame.
 * Returned by GET /api/v1/predictions/latest
 */
export interface LatestPrediction {
  signal: SignalDirection;
  /** e.g. "BUY XAUUSD" | "SELL XAUUSD" | "NEUTRAL" */
  signal_label: string;
  /** e.g. "Predicted Bias: BAD FOR USD (Dovish CPI)" */
  signal_subtitle: string;
  /** 0.0 to 100.0 */
  confidence_score: number;
  /** Weighted composite score [-1.0, +1.0] */
  composite_score: number;
  /** e.g. "Consumer Price Index (CPI)" */
  event_name: string;
  event_code: string;
  /** ISO 8601 datetime string (UTC) */
  release_date: string;
  /** Seconds until release */
  countdown_seconds: number;
  engine_metadata: EngineMetadata;
  /** Extracted leading indicators for the dashboard */
  leading_indicators?: LeadingIndicator[];
}

/**
 * Prediction log entry for the Historical Accuracy view.
 */
export interface PredictionLogEntry {
  id: string;
  release_id: string;
  signal: SignalDirection;
  signal_label: string;
  confidence_score: number;
  is_correct: boolean | null;
  predicted_at: string;
  accuracy_checked_at: string | null;
}
