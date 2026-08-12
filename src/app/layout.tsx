import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
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
  text:     "#F8FAFC",
};

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
          <Sidebar />

          {/* ---------------------------------------------------------------- */}
          {/* Main content area                                                */}
          {/* ---------------------------------------------------------------- */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "auto" }}>
            <Header />
            {children}
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
