/**
 * lib/api/history.ts
 * API client for historical and accuracy endpoints.
 */

import { API_BASE_URL } from "@/lib/constants";

export async function fetchHistoricalReleases(eventCode?: string) {
  const url = new URL(`${API_BASE_URL}/history/`);
  if (eventCode) {
    url.searchParams.append("event_code", eventCode);
  }
  const res = await fetch(url.toString(), {
    next: { revalidate: 60 },
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch historical releases: ${res.statusText}`);
  }

  return res.json();
}

export async function fetchAccuracySummary() {
  const res = await fetch(`${API_BASE_URL}/history/accuracy-summary`, {
    next: { revalidate: 60 },
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch accuracy summary: ${res.statusText}`);
  }

  return res.json();
}
