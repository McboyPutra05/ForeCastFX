"use client";

import { COLORS as C } from "@/lib/constants";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  
  let pageTitle = "Dashboard Overview";
  if (pathname === "/calendar") pageTitle = "Economic Calendar";
  if (pathname === "/history") pageTitle = "Historical Logs";
  if (pathname === "/settings") pageTitle = "Settings";

  return (
    <header style={{
      height: "60px", backgroundColor: "#0E1421",
      borderBottom: `1px solid ${C.border}`,
      padding: "0 24px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      position: "sticky", top: 0, zIndex: 9,
    }}>
      <span style={{ fontSize: "14px", fontWeight: 600, color: C.textPrimary }}>{pageTitle}</span>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <span style={{ fontSize: "11px", color: C.textSecondary, fontFamily: "'JetBrains Mono', monospace" }}>
          LIVE · XAUUSD
        </span>
        <div style={{
          width: "32px", height: "32px", borderRadius: "50%",
          backgroundColor: C.border,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "12px", color: C.textPrimary, cursor: "pointer",
        }}>U</div>
      </div>
    </header>
  );
}
