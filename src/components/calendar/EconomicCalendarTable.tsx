"use client";

import { useState } from "react";
import { COLORS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface CalendarEvent {
  time: string;
  date?: string; // Formatted date string (e.g. Mon, Aug 24)
  release_date?: string; // Full ISO string for filtering
  currency: string;
  impact: "HIGH" | "MEDIUM" | "LOW";
  event: string;
  actual: string;
  forecast: string;
  previous: string;
  result?: "BETTER" | "WORSE" | "NEUTRAL";
  trendData?: number[];
}

interface EconomicCalendarTableProps {
  events: CalendarEvent[];
}

const IMPACT_COLORS: Record<string, { bg: string; text: string; label: string; icon?: string }> = {
  HIGH:   { bg: "rgba(220, 38, 38, 0.15)", text: "#EF4444", label: "HIGH", icon: "⚠" },
  MEDIUM: { bg: "rgba(249, 115, 22, 0.15)", text: "#F97316", label: "MED" },
  LOW:    { bg: "rgba(100, 116, 139, 0.15)", text: "#64748B", label: "LOW" },
};

const CURRENCY_BG: Record<string, string> = {
  USD: "rgba(16, 185, 129, 0.15)",
  EUR: "rgba(234, 179, 8, 0.15)",
  GBP: "rgba(99, 102, 241, 0.15)",
  CAD: "rgba(239, 68, 68, 0.15)",
  NZD: "rgba(168, 85, 247, 0.15)",
};

const CURRENCY_TEXT: Record<string, string> = {
  USD: "#34D399",
  EUR: "#FCD34D",
  GBP: "#818CF8",
  CAD: "#F87171",
  NZD: "#C084FC",
  AUD: "#60A5FA", // Blue
  JPY: "#F472B6", // Pink
  CHF: "#9CA3AF", // Gray
};
export function EconomicCalendarTable({ events }: EconomicCalendarTableProps) {
  const [activeTab, setActiveTab] = useState("Tomorrow");
  const [showHighImpact, setShowHighImpact] = useState(true);
  const [showMediumImpact, setShowMediumImpact] = useState(true);
  const [showLowImpact, setShowLowImpact] = useState(true);
  
  // Currency Filters
  const [showUSD, setShowUSD] = useState(true);
  const [showEUR, setShowEUR] = useState(true);
  const [showGBP, setShowGBP] = useState(true);
  const [showCAD, setShowCAD] = useState(true);
  const [showNZD, setShowNZD] = useState(true);
  const [showAUD, setShowAUD] = useState(true);
  const [showJPY, setShowJPY] = useState(true);
  const [showCHF, setShowCHF] = useState(true);

  // Filter the events
  const filteredEvents = events.filter((ev) => {
    // Impact & Currency Filters
    if (ev.impact === "HIGH" && !showHighImpact) return false;
    if (ev.impact === "MEDIUM" && !showMediumImpact) return false;
    if (ev.impact === "LOW" && !showLowImpact) return false;

    if (ev.currency === "USD" && !showUSD) return false;
    if (ev.currency === "EUR" && !showEUR) return false;
    if (ev.currency === "GBP" && !showGBP) return false;
    if (ev.currency === "CAD" && !showCAD) return false;
    if (ev.currency === "NZD" && !showNZD) return false;
    if (ev.currency === "AUD" && !showAUD) return false;
    if (ev.currency === "JPY" && !showJPY) return false;
    if (ev.currency === "CHF" && !showCHF) return false;
    
    // Time Tab Filters
    if (ev.release_date) {
      const release = new Date(ev.release_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const dayAfterTomorrow = new Date(today);
      dayAfterTomorrow.setDate(today.getDate() + 2);
      // Calculate start of this week (Monday)
      const startOfWeek = new Date(today);
      const day = startOfWeek.getDay();
      const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
      startOfWeek.setDate(diff);
      
      // Calculate end of this week (next Monday)
      const nextWeek = new Date(startOfWeek);
      nextWeek.setDate(startOfWeek.getDate() + 7);

      if (activeTab === "Today") {
        if (release < today || release >= tomorrow) return false;
      } else if (activeTab === "Tomorrow") {
        if (release < tomorrow || release >= dayAfterTomorrow) return false;
      } else if (activeTab === "This Week") {
        if (release < startOfWeek || release >= nextWeek) return false;
      }
    }

    return true;
  });

  return (
    <div style={{ backgroundColor: COLORS.backgroundPrimary, display: "flex", flexDirection: "column", gap: "16px" }}>
      
      {/* Filters Bar with Shadcn */}
      <div className="flex justify-between items-center pb-3 border-b" style={{ borderColor: COLORS.border }}>
        
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-[#121826] border border-[#1F293D] text-gray-200 hover:bg-[#1E293B] hover:text-white flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium outline-none transition-colors">
            <span className="opacity-70">≡</span> FILTERS
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-[#121826] border-[#1F293D] text-gray-200">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Filter by Impact</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#1F293D]" />
              <DropdownMenuCheckboxItem checked={showHighImpact} onCheckedChange={setShowHighImpact} className="hover:bg-[#1E293B] cursor-pointer">
                High Impact
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={showMediumImpact} onCheckedChange={setShowMediumImpact} className="hover:bg-[#1E293B] cursor-pointer">
                Medium Impact
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={showLowImpact} onCheckedChange={setShowLowImpact} className="hover:bg-[#1E293B] cursor-pointer">
                Low Impact
              </DropdownMenuCheckboxItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="bg-[#1F293D] my-2" />

            <DropdownMenuGroup>
              <DropdownMenuLabel>Filter by Currency</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#1F293D]" />
              <DropdownMenuCheckboxItem checked={showUSD} onCheckedChange={setShowUSD} className="hover:bg-[#1E293B] cursor-pointer">
                USD
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={showEUR} onCheckedChange={setShowEUR} className="hover:bg-[#1E293B] cursor-pointer">
                EUR
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={showGBP} onCheckedChange={setShowGBP} className="hover:bg-[#1E293B] cursor-pointer">
                GBP
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={showCAD} onCheckedChange={setShowCAD} className="hover:bg-[#1E293B] cursor-pointer">
                CAD
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={showNZD} onCheckedChange={setShowNZD} className="hover:bg-[#1E293B] cursor-pointer">
                NZD
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={showAUD} onCheckedChange={setShowAUD} className="hover:bg-[#1E293B] cursor-pointer">
                AUD
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={showJPY} onCheckedChange={setShowJPY} className="hover:bg-[#1E293B] cursor-pointer">
                JPY
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={showCHF} onCheckedChange={setShowCHF} className="hover:bg-[#1E293B] cursor-pointer">
                CHF
              </DropdownMenuCheckboxItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Tabs defaultValue="Tomorrow" className="w-[300px] h-8 bg-[#121826] border-[#1F293D] border rounded-md" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 h-full bg-transparent p-0">
            <TabsTrigger value="Today" className="text-xs text-gray-400 data-[state=active]:bg-white/5 data-[state=active]:text-white h-full rounded-none rounded-l-md border-r border-[#1F293D]">
              Today
            </TabsTrigger>
            <TabsTrigger value="Tomorrow" className="text-xs text-gray-400 data-[state=active]:bg-white/5 data-[state=active]:text-white h-full rounded-none border-r border-[#1F293D]">
              Tomorrow
            </TabsTrigger>
            <TabsTrigger value="This Week" className="text-xs text-gray-400 data-[state=active]:bg-white/5 data-[state=active]:text-white h-full rounded-none rounded-r-md">
              This Week
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Table Container */}
      <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: "8px", overflow: "hidden" }}>
        
        {/* Table Header */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: "100px 80px 70px 100px 1fr 90px 90px 90px 100px",
            backgroundColor: "#111827",
            padding: "12px 16px",
            borderBottom: `1px solid ${COLORS.border}`,
          }}
        >
          {["DATE", "TIME", "CUR", "IMPACT", "EVENT", "ACTUAL", "FORECAST", "PREVIOUS", "TREND"].map((h) => (
            <span key={h} style={{ fontSize: "10px", fontWeight: 700, color: COLORS.textSecondary, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {h}
            </span>
          ))}
        </div>

        {/* Table Rows */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((ev, i) => (
              <CalendarRow key={i} event={ev} isLast={i === filteredEvents.length - 1} />
            ))
          ) : (
            <div style={{ padding: "24px", textAlign: "center", color: COLORS.textSecondary, fontSize: "13px" }}>
              No events match the selected filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CalendarRow({ event: ev, isLast }: { event: CalendarEvent; isLast: boolean }) {
  const impactStyle = IMPACT_COLORS[ev.impact];
  const curBg = CURRENCY_BG[ev.currency] || "rgba(255,255,255,0.1)";
  const curText = CURRENCY_TEXT[ev.currency] || "#FFF";

  let actualColor: string = COLORS.textSecondary;
  if (ev.result === "BETTER") actualColor = "#34D399";
  if (ev.result === "WORSE") actualColor = "#F87171";
  if (ev.result === "NEUTRAL") actualColor = "#94A3B8";

  // Accent border on the left based on impact
  const leftBorderColor = ev.impact === "HIGH" ? "#EF4444" : "transparent";

  return (
    <div
      className="grid items-center transition-colors duration-150"
      style={{
        gridTemplateColumns: "100px 80px 70px 100px 1fr 90px 90px 90px 100px",
        padding: "14px 16px",
        backgroundColor: COLORS.cardSurface,
        borderBottom: isLast ? "none" : `1px solid ${COLORS.border}`,
        borderLeft: `3px solid ${leftBorderColor}`,
        cursor: "pointer",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1E293B")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = COLORS.cardSurface)}
    >
      <span style={{ fontSize: "12px", color: COLORS.textPrimary, fontWeight: 500 }}>
        {ev.date || "—"}
      </span>

      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: COLORS.textSecondary }}>
        {ev.time}
      </span>

      <span>
        <span style={{
          backgroundColor: curBg, color: curText, fontSize: "10px", fontWeight: 700,
          padding: "3px 6px", borderRadius: "4px"
        }}>
          {ev.currency}
        </span>
      </span>

      <span>
        <span style={{
          backgroundColor: impactStyle.bg, color: impactStyle.text, fontSize: "10px", fontWeight: 700,
          padding: "3px 8px", borderRadius: "4px", display: "inline-flex", alignItems: "center", gap: "4px"
        }}>
          {impactStyle.icon && <span>{impactStyle.icon}</span>}
          {impactStyle.label}
        </span>
      </span>

      <span style={{ fontSize: "13px", color: COLORS.textPrimary, fontWeight: 500 }}>
        {ev.event}
      </span>

      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", fontWeight: 600, color: actualColor }}>
        {ev.actual}
      </span>

      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: COLORS.textSecondary }}>
        {ev.forecast}
      </span>

      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: COLORS.textSecondary }}>
        {ev.previous}
      </span>

      {/* Sparkline Trend */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", height: "16px" }}>
        {(ev.trendData || [0.4, 0.6, 0.5, 0.8, 1.0]).map((val, idx, arr) => {
          const isLastBar = idx === arr.length - 1;
          const barColor = isLastBar ? actualColor : "rgba(255,255,255,0.2)";
          return (
            <div key={idx} style={{
              width: "5px", height: `${Math.max(10, val * 100)}%`,
              backgroundColor: barColor, borderRadius: "1px"
            }} />
          )
        })}
      </div>
    </div>
  );
}
