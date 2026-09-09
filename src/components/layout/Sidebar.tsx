"use client";

import { useState, useEffect } from "react";
import { COLORS as C, SIGNAL_COLORS } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { label: "Dashboard",         icon: "◈", href: "/dashboard" },
  { label: "Economic Calendar", icon: "⧖", href: "/calendar" },
  { label: "Historical Logs",   icon: "⊟", href: "/history" },
  { label: "Settings",          icon: "⚙", href: "/settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("forecastfx_user");
      if (stored) setUser(JSON.parse(stored));
    } catch {}
  }, []);

  // Hide sidebar on auth pages
  if (pathname?.startsWith("/auth")) return null;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

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
          <img 
            src="/logo-forecastFX.png" 
            alt="ForeCastFX Logo" 
            style={{ width: "32px", height: "32px", objectFit: "cover", borderRadius: "8px" }} 
          />
          <div>
            <div style={{ fontSize: "16px", fontWeight: 700, color: C.textPrimary, lineHeight: 1.1, fontFamily: "'TAN Angleton', sans-serif" }}>ForeCastFX</div>
            <div style={{ fontSize: "9px", color: C.textSecondary, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "2px" }}>XAUUSD Signals</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: "16px 12px", flex: 1 }}>
        <div style={{ fontSize: "9px", color: C.textSecondary, textTransform: "uppercase", letterSpacing: "0.12em", padding: "0 8px", marginBottom: "8px" }}>Navigation</div>
        {NAV.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} style={{
              display: "flex", alignItems: "center", gap: "10px",
              padding: "9px 12px", borderRadius: "8px",
              fontSize: "13px", fontWeight: 600,
              backgroundColor: isActive ? "rgba(52, 211, 153, 0.1)" : "transparent",
              color: isActive ? "#34D399" : C.textSecondary,
              border: isActive ? "1px solid rgba(52, 211, 153, 0.2)" : "1px solid transparent",
              textDecoration: "none", marginBottom: "4px",
              transition: "all 0.15s",
            }}>
              <span style={{ fontSize: "15px", color: isActive ? "#34D399" : C.textSecondary }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User Profile Section */}
      <div style={{ padding: "12px", borderTop: `1px solid ${C.border}` }}>
        <Link href="/profile" style={{
          display: "flex", alignItems: "center", gap: "10px",
          padding: "10px 12px", borderRadius: "10px",
          textDecoration: "none",
          backgroundColor: pathname === "/profile" ? "rgba(59, 130, 246, 0.1)" : "transparent",
          border: pathname === "/profile" ? "1px solid rgba(59, 130, 246, 0.2)" : "1px solid transparent",
          transition: "all 0.15s",
          cursor: "pointer",
        }}>
          {/* Avatar */}
          <div style={{
            width: "32px", height: "32px",
            borderRadius: "50%",
            overflow: "hidden",
            backgroundColor: "#1E293B",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            {user?.avatar_url ? (
              <img
                src={user.avatar_url}
                alt="Profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                referrerPolicy="no-referrer"
              />
            ) : (
              <span style={{
                fontSize: "12px", fontWeight: 800,
                color: "#3B82F6",
              }}>
                {getInitials(user?.full_name || "U")}
              </span>
            )}
          </div>

          {/* Name & Email */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: "12px", fontWeight: 700,
              color: pathname === "/profile" ? "#3B82F6" : C.textPrimary,
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>
              {user?.full_name || "Profile"}
            </div>
            <div style={{
              fontSize: "10px", color: C.textSecondary,
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>
              {user?.email || "Sign in to view"}
            </div>
          </div>
        </Link>
      </div>

      {/* Status */}
      <div style={{ padding: "12px 20px 16px", borderTop: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: SIGNAL_COLORS.BUY }} />
          <span style={{ fontSize: "11px", color: C.textSecondary }}>Engine Active</span>
        </div>
      </div>
    </aside>
  );
}
