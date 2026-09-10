/**
 * lib/api/history.ts
 * API client for historical and accuracy endpoints.
 */

import { API_BASE_URL } from "@/lib/constants";

export async function fetchHistoricalReleases(eventCode?: string, month?: string, limit: number = 100) {
  const baseUrl = typeof window !== "undefined" && process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL
    : API_BASE_URL;

  const url = new URL(`${baseUrl}/history/`);
  if (eventCode && eventCode !== "ALL") {
    url.searchParams.append("event_code", eventCode);
  }
  if (month && month !== "ALL") {
    url.searchParams.append("month", month);
  }
  url.searchParams.append("page_size", String(limit));

  const res = await fetch(url.toString(), {
    cache: "no-store",
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
