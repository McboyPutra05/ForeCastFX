import { COLORS as C, SIGNAL_COLORS } from "@/lib/constants";
import Link from "next/link";

const NAV = [
  { label: "Dashboard",         icon: "◈", href: "/" },
  { label: "Economic Calendar", icon: "⧖", href: "/calendar" },
  { label: "Historical Logs",   icon: "⊟", href: "/history" },
  { label: "Settings",          icon: "⚙", href: "/settings" },
];

export function Sidebar() {
  return (
    <aside style={{
      width: "220px", minWidth: "220px",
      backgroundColor: "#0E1421",
      borderRight: `1px solid ${C.border}`,
      display: "flex", flexDirection: "column",
      position: "sticky", top: 0, height: "100vh", zIndex: 10,
    }}>
      {/* Logo */}
      <div style={{ padding: "24px 20px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "30px", height: "30px",
            backgroundColor: SIGNAL_COLORS.BUY, borderRadius: "6px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "12px", fontWeight: 800, color: C.backgroundPrimary,
            fontFamily: "'Inter', sans-serif",
          }}>IT</div>
          <div>
            <div style={{ fontSize: "14px", fontWeight: 700, color: C.textPrimary, lineHeight: 1.1 }}>Info Trader</div>
            <div style={{ fontSize: "9px", color: C.textSecondary, textTransform: "uppercase", letterSpacing: "0.1em" }}>XAUUSD Signals</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: "16px 12px", flex: 1 }}>
        <div style={{ fontSize: "9px", color: C.textSecondary, textTransform: "uppercase", letterSpacing: "0.12em", padding: "0 8px", marginBottom: "8px" }}>Navigation</div>
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} style={{
            display: "flex", alignItems: "center", gap: "10px",
            padding: "9px 12px", borderRadius: "8px",
            fontSize: "13px", fontWeight: 500,
            color: C.textSecondary,
            textDecoration: "none", marginBottom: "2px",
            transition: "all 0.15s",
          }}>
            <span style={{ fontSize: "14px" }}>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Status */}
      <div style={{ padding: "16px 20px", borderTop: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: SIGNAL_COLORS.BUY }} />
          <span style={{ fontSize: "11px", color: C.textSecondary }}>Engine Active</span>
        </div>
      </div>
    </aside>
  );
}
