/**
 * app/history/page.tsx
 * Route for the Historical Logs page.
 * Server Component: delegates UI rendering to HistoryPageUI.
 */

import { HistoryPageUI } from "@/pages/HistoryPageUI";

export default function HistoryPage() {
  return <HistoryPageUI />;
}
