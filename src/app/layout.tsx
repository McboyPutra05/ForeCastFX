import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

// ---------------------------------------------------------------------------
// Fonts — StyleGuide.md spec
// ---------------------------------------------------------------------------
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// ---------------------------------------------------------------------------
// SEO Metadata
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: {
    default: "Info Trader — US Macroeconomic Prediction Dashboard",
    template: "%s | Info Trader",
  },
  description:
    "AI-powered US macroeconomic news prediction dashboard for XAUUSD traders. " +
    "Get BUY/SELL signals based on leading economic indicators before major news releases.",
  keywords: ["XAUUSD", "gold trading", "NFP prediction", "CPI forecast", "forex signals"],
  robots: { index: false, follow: false },
};

// ---------------------------------------------------------------------------
// Design tokens (inline — avoids client component import)
// ---------------------------------------------------------------------------
const C = {
  bg:       "#090D16",
  card:     "#121826",
  border:   "#1F293D",
  sidebar:  "#0E1421",
  text:     "#F8FAFC",
  muted:    "#94A3B8",
  green:    "#10B981",
  amber:    "#F59E0B",
};

const NAV = [
  { label: "Dashboard",         icon: "◈", href: "/" },
  { label: "Economic Calendar", icon: "⧖", href: "/calendar" },
  { label: "Historical Logs",   icon: "⊟", href: "/history" },
];

// ---------------------------------------------------------------------------
// Root Layout — includes full dashboard shell
// ---------------------------------------------------------------------------
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body
        style={{ backgroundColor: C.bg, color: C.text, display: "flex", minHeight: "100vh" }}
      >
        <TooltipProvider delay={300}>
          {/* ---------------------------------------------------------------- */}
          {/* Sidebar                                                          */}
          {/* ---------------------------------------------------------------- */}
          <aside style={{
            width: "220px", minWidth: "220px",
            backgroundColor: C.sidebar,
            borderRight: `1px solid ${C.border}`,
            display: "flex", flexDirection: "column",
            position: "sticky", top: 0, height: "100vh", zIndex: 10,
          }}>
            {/* Logo */}
            <div style={{ padding: "24px 20px", borderBottom: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{
                  width: "30px", height: "30px",
                  backgroundColor: C.green, borderRadius: "6px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "12px", fontWeight: 800, color: C.bg,
                  fontFamily: "'Inter', sans-serif",
                }}>IT</div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: C.text, lineHeight: 1.1 }}>Info Trader</div>
                  <div style={{ fontSize: "9px", color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em" }}>XAUUSD Signals</div>
                </div>
              </div>
            </div>

            {/* Nav */}
            <nav style={{ padding: "16px 12px", flex: 1 }}>
              <div style={{ fontSize: "9px", color: C.muted, textTransform: "uppercase", letterSpacing: "0.12em", padding: "0 8px", marginBottom: "8px" }}>Navigation</div>
              {NAV.map((item) => (
                <a key={item.href} href={item.href} style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "9px 12px", borderRadius: "8px",
                  fontSize: "13px", fontWeight: 500,
                  color: C.muted,
                  textDecoration: "none", marginBottom: "2px",
                  transition: "all 0.15s",
                }}>
                  <span style={{ fontSize: "14px" }}>{item.icon}</span>
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Status */}
            <div style={{ padding: "16px 20px", borderTop: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: C.green }} />
                <span style={{ fontSize: "11px", color: C.muted }}>Engine Active</span>
              </div>
            </div>
          </aside>

          {/* ---------------------------------------------------------------- */}
          {/* Main content area                                                */}
          {/* ---------------------------------------------------------------- */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "auto" }}>
            {/* Header */}
            <header style={{
              height: "60px", backgroundColor: C.sidebar,
              borderBottom: `1px solid ${C.border}`,
              padding: "0 24px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              position: "sticky", top: 0, zIndex: 9,
            }}>
              <span style={{ fontSize: "14px", fontWeight: 600, color: C.text }}>Dashboard Overview</span>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <span style={{ fontSize: "11px", color: C.muted, fontFamily: "'JetBrains Mono', monospace" }}>
                  LIVE · XAUUSD
                </span>
                <div style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  backgroundColor: C.border,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "12px", color: C.text, cursor: "pointer",
                }}>U</div>
              </div>
            </header>

            {children}
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
