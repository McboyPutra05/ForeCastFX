/**
 * lib/api/history.ts
 * API client for historical and accuracy endpoints.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

export async function fetchHistoricalReleases(eventCode?: string) {
  const url = new URL(`${API_BASE}/history/`);
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
  const res = await fetch(`${API_BASE}/history/accuracy-summary`, {
    next: { revalidate: 60 },
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch accuracy summary: ${res.statusText}`);
  }

  return res.json();
}
