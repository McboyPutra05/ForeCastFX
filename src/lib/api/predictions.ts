/**
 * lib/api/predictions.ts
 * API client for prediction endpoints.
 */

import type { LatestPrediction, PredictionLogEntry } from "@/types/prediction";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

/**
 * Fetch the latest BUY/SELL prediction for the nearest High Impact event.
 * Powers the Hero Prediction Frame.
 */
export async function fetchLatestPrediction(): Promise<LatestPrediction> {
  const res = await fetch(`${API_BASE}/predictions/latest`, {
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
  const res = await fetch(`${API_BASE}/predictions/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch prediction ${id}: ${res.status}`);
  }

  return res.json() as Promise<PredictionLogEntry>;
}
