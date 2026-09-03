/**
 * lib/api/calendar.ts
 * API client for calendar endpoints.
 */

import { API_BASE_URL } from "@/lib/constants";

export async function fetchUpcomingEvents(limit = 10) {
  const res = await fetch(`${API_BASE_URL}/calendar/upcoming?limit=${limit}`, {
    next: { revalidate: 60 },
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch upcoming events: ${res.statusText}`);
  }

  return res.json();
}
