/**
 * lib/api/predictions.ts
 * API client for prediction endpoints.
 */

import type { LatestPrediction, PredictionLogEntry } from "@/types/prediction";
import { API_BASE_URL } from "@/lib/constants";

/**
 * Fetch the latest BUY/SELL prediction for the nearest High Impact event.
 * Powers the Hero Prediction Frame.
 */
export async function fetchLatestPrediction(eventCode?: string): Promise<LatestPrediction> {
  const url = eventCode
    ? `${API_BASE_URL}/predictions/latest?event_code=${encodeURIComponent(eventCode)}`
    : `${API_BASE_URL}/predictions/latest`;

  const res = await fetch(url, {
    next: { revalidate: 30 }, // ISR: revalidate every 30 seconds
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch latest prediction: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<LatestPrediction>;
}

/**
 * Fetch a specific prediction log entry by ID.
 */
export async function fetchPredictionById(id: string): Promise<PredictionLogEntry> {
  const res = await fetch(`${API_BASE_URL}/predictions/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch prediction ${id}: ${res.status}`);
  }

  return res.json() as Promise<PredictionLogEntry>;
}
