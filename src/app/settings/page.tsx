/**
 * app/settings/page.tsx
 * Route for the Settings page.
 * Server Component: delegates UI rendering to SettingsPageUI.
 */

import { SettingsPageUI } from "@/pages/SettingsPageUI";

export default function SettingsPage() {
  return <SettingsPageUI />;
}
