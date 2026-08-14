/**
 * app/calendar/page.tsx
 * Route for the Economic Calendar page.
 * Server Component: delegates UI rendering to CalendarPageUI.
 */

import { CalendarPageUI } from "@/pages/CalendarPageUI";

export default function CalendarPage() {
  return <CalendarPageUI />;
}
