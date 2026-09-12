/**
 * lib/api/calendar.ts
 * API client for calendar endpoints.
 */

import { API_BASE_URL } from "@/lib/constants";

export async function fetchUpcomingEvents(limit = 100, includePast = true, month = "this_month") {
  const baseUrl = typeof window !== "undefined" && process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL
    : API_BASE_URL;

  const url = new URL(`${baseUrl}/calendar/upcoming`);
  url.searchParams.append("limit", String(limit));
  url.searchParams.append("include_past", String(includePast));
  if (month) url.searchParams.append("month", month);

  const res = await fetch(url.toString(), {
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch upcoming events: ${res.statusText}`);
  }

  return res.json();
}
