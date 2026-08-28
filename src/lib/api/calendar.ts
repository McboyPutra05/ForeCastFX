/**
 * lib/api/calendar.ts
 * API client for calendar endpoints.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

export async function fetchUpcomingEvents(limit = 10) {
  const res = await fetch(`${API_BASE}/calendar/upcoming?limit=${limit}`, {
    next: { revalidate: 60 },
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch upcoming events: ${res.statusText}`);
  }

  return res.json();
}
