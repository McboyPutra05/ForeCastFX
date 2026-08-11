/**
 * app/history/page.tsx
 * Route for the Historical Logs page.
 * Server Component: delegates UI rendering to HistoryPageUI.
 */

import { HistoryPageUI } from "@/components/pages/HistoryPageUI";

export default function HistoryPage() {
  return <HistoryPageUI />;
}
