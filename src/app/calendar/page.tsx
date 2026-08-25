/**
 * app/calendar/page.tsx
 * Route for the Economic Calendar page.
 * Server Component: delegates UI rendering to CalendarPageUI.
 */

import { CalendarPageUI } from "@/pages/CalendarPageUI";
import { fetchUpcomingEvents } from "@/lib/api/calendar";

async function getCalendarEvents() {
  try {
    const data = await fetchUpcomingEvents(50); // Get more events for the full calendar page
    return data.events || [];
  } catch (error) {
    console.error("Failed to fetch calendar events:", error);
    return [];
  }
}

export default async function CalendarPage() {
  const events = await getCalendarEvents();
  return <CalendarPageUI calendarEvents={events} />;
}
