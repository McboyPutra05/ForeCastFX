/**
 * app/page.tsx
 * Root route — redirects to login page.
 */

import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/auth/login");
}
