"use client";

import { useState } from "react";
import { COLORS } from "@/lib/constants";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { Download, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Indicator = "CPI" | "NFP" | "GDP" | "PMI" | "FOMC" | "PPI" | "Retail Sales";

const MOCK_DATA_BY_INDICATOR: Record<Indicator, any> = {
  CPI: {
    hitRate: "82.4%",
    hitRateTrend: "↑ +1.2% MoM",
    chart: [
      { name: "JAN", predicted: 5.8, actual: 5.5 },
      { name: "FEB", predicted: 4.8, actual: 4.5 },
      { name: "MAR", predicted: 4.5, actual: 4.5 },
      { name: "APR", predicted: 3.9, actual: 4.1 },
      { name: "MAY", predicted: 3.6, actual: 3.5 },
      { name: "JUN", predicted: 3.2, actual: 3.2 },
    ],
    history: [
      { date: "2023-11-14", event: "US Core CPI (YoY)", predicted: "4.1%", actual: "4.0%", delta: "-0.1%", deltaColor: "#34D399", status: "HIT" },
      { date: "2023-10-12", event: "US Core CPI (YoY)", predicted: "4.1%", actual: "4.1%", delta: "0.0%", deltaColor: "#94A3B8", status: "EXACT" },
      { date: "2023-09-13", event: "US Core CPI (YoY)", predicted: "4.3%", actual: "4.3%", delta: "0.0%", deltaColor: "#94A3B8", status: "EXACT" },
    ]
  },
  NFP: {
    hitRate: "68.5%",
    hitRateTrend: "↓ -0.8% MoM",
    trendColor: "#EF4444",
    chart: [
      { name: "JAN", predicted: 220, actual: 275 },
      { name: "FEB", predicted: 190, actual: 210 },
      { name: "MAR", predicted: 200, actual: 180 },
      { name: "APR", predicted: 185, actual: 175 },
      { name: "MAY", predicted: 190, actual: 190 },
      { name: "JUN", predicted: 160, actual: 150 },
    ],
    history: [
      { date: "2023-11-03", event: "US Non Farm Payrolls", predicted: "180K", actual: "150K", delta: "-30K", deltaColor: "#EF4444", status: "MISS" },
      { date: "2023-10-06", event: "US Non Farm Payrolls", predicted: "170K", actual: "336K", delta: "+166K", deltaColor: "#EF4444", status: "MISS" },
      { date: "2023-09-01", event: "US Non Farm Payrolls", predicted: "170K", actual: "187K", delta: "+17K", deltaColor: "#34D399", status: "HIT" },
    ]
  },
  GDP: {
    hitRate: "91.2%",
    hitRateTrend: "↑ +2.5% YoY",
    chart: [
      { name: "Q1", predicted: 1.2, actual: 1.3 },
      { name: "Q2", predicted: 2.1, actual: 2.1 },
      { name: "Q3", predicted: 4.3, actual: 4.9 },
      { name: "Q4", predicted: 3.1, actual: 3.3 },
    ],
    history: [
      { date: "2023-10-26", event: "US GDP Growth Rate (Q3)", predicted: "4.3%", actual: "4.9%", delta: "+0.6%", deltaColor: "#34D399", status: "HIT" },
      { date: "2023-07-27", event: "US GDP Growth Rate (Q2)", predicted: "2.1%", actual: "2.1%", delta: "0.0%", deltaColor: "#94A3B8", status: "EXACT" },
      { date: "2023-04-27", event: "US GDP Growth Rate (Q1)", predicted: "1.2%", actual: "1.3%", delta: "+0.1%", deltaColor: "#34D399", status: "HIT" },
    ]
  },
  PMI: {
    hitRate: "76.8%",
    hitRateTrend: "↑ +0.4% MoM",
    chart: [
      { name: "JAN", predicted: 48.1, actual: 49.1 },
      { name: "FEB", predicted: 49.5, actual: 47.8 },
      { name: "MAR", predicted: 48.0, actual: 50.3 },
      { name: "APR", predicted: 50.1, actual: 49.2 },
      { name: "MAY", predicted: 49.8, actual: 48.7 },
      { name: "JUN", predicted: 48.5, actual: 48.5 },
    ],
    history: [
      { date: "2023-11-01", event: "US ISM Manufacturing PMI", predicted: "49.0", actual: "46.7", delta: "-2.3", deltaColor: "#EF4444", status: "MISS" },
      { date: "2023-10-02", event: "US ISM Manufacturing PMI", predicted: "47.8", actual: "49.0", delta: "+1.2", deltaColor: "#34D399", status: "HIT" },
      { date: "2023-09-01", event: "US ISM Manufacturing PMI", predicted: "47.0", actual: "47.6", delta: "+0.6", deltaColor: "#34D399", status: "HIT" },
    ]
  },
  FOMC: {
    hitRate: "95.0%",
    hitRateTrend: "↑ +2.0% MoM",
    chart: [
      { name: "JAN", predicted: 5.5, actual: 5.5 },
      { name: "MAR", predicted: 5.5, actual: 5.5 },
      { name: "MAY", predicted: 5.5, actual: 5.5 },
      { name: "JUN", predicted: 5.5, actual: 5.5 },
      { name: "JUL", predicted: 5.5, actual: 5.5 },
      { name: "SEP", predicted: 5.25, actual: 5.25 },
    ],
    history: [
      { date: "2023-11-01", event: "US Fed Interest Rate Decision", predicted: "5.5%", actual: "5.5%", delta: "0.0%", deltaColor: "#94A3B8", status: "EXACT" },
      { date: "2023-09-20", event: "US Fed Interest Rate Decision", predicted: "5.5%", actual: "5.5%", delta: "0.0%", deltaColor: "#94A3B8", status: "EXACT" },
      { date: "2023-07-26", event: "US Fed Interest Rate Decision", predicted: "5.5%", actual: "5.5%", delta: "0.0%", deltaColor: "#94A3B8", status: "EXACT" },
    ]
  },
  PPI: {
    hitRate: "79.2%",
    hitRateTrend: "↓ -0.5% MoM",
    trendColor: "#EF4444",
    chart: [
      { name: "JAN", predicted: 1.2, actual: 1.5 },
      { name: "FEB", predicted: 1.5, actual: 1.6 },
      { name: "MAR", predicted: 2.1, actual: 2.1 },
      { name: "APR", predicted: 2.2, actual: 2.2 },
      { name: "MAY", predicted: 2.3, actual: 2.5 },
      { name: "JUN", predicted: 2.6, actual: 2.6 },
    ],
    history: [
      { date: "2023-11-15", event: "US PPI (YoY)", predicted: "1.9%", actual: "1.3%", delta: "-0.6%", deltaColor: "#34D399", status: "HIT" },
      { date: "2023-10-11", event: "US PPI (YoY)", predicted: "1.6%", actual: "2.2%", delta: "+0.6%", deltaColor: "#EF4444", status: "MISS" },
      { date: "2023-09-14", event: "US PPI (YoY)", predicted: "1.2%", actual: "1.6%", delta: "+0.4%", deltaColor: "#EF4444", status: "MISS" },
    ]
  },
  "Retail Sales": {
    hitRate: "73.5%",
    hitRateTrend: "↑ +1.1% MoM",
    chart: [
      { name: "JAN", predicted: 0.2, actual: 0.3 },
      { name: "FEB", predicted: -0.1, actual: -0.2 },
      { name: "MAR", predicted: 0.5, actual: 0.7 },
      { name: "APR", predicted: 0.4, actual: 0.4 },
      { name: "MAY", predicted: 0.3, actual: 0.1 },
      { name: "JUN", predicted: 0.1, actual: 0.0 },
    ],
    history: [
      { date: "2023-11-15", event: "US Retail Sales (MoM)", predicted: "-0.3%", actual: "-0.1%", delta: "+0.2%", deltaColor: "#34D399", status: "HIT" },
      { date: "2023-10-17", event: "US Retail Sales (MoM)", predicted: "0.3%", actual: "0.7%", delta: "+0.4%", deltaColor: "#EF4444", status: "MISS" },
      { date: "2023-09-14", event: "US Retail Sales (MoM)", predicted: "0.2%", actual: "0.6%", delta: "+0.4%", deltaColor: "#EF4444", status: "MISS" },
    ]
  }
};

export function HistoryPageUI() {
  const [activeFilter, setActiveFilter] = useState<Indicator>("CPI");
  
  const currentData = MOCK_DATA_BY_INDICATOR[activeFilter];

  return (
    <main
      className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6"
      style={{ backgroundColor: COLORS.backgroundPrimary }}
    >
      {/* INDICATOR FILTER SECTION */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-xl border" style={{ backgroundColor: COLORS.cardSurface, borderColor: COLORS.border }}>
        <div className="flex flex-col gap-4 w-full md:w-auto">
          <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">Indicator Filter</span>
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger className="bg-[#121826] border border-[#1F293D] text-gray-200 hover:bg-[#1E293B] hover:text-white flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium outline-none transition-colors h-8">
                <span className="opacity-70">≡</span> {activeFilter} FILTER
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-[#121826] border-[#1F293D] text-gray-200">
                {(["CPI", "NFP", "GDP", "PMI", "FOMC", "PPI", "Retail Sales"] as Indicator[]).map((filter) => (
                  <DropdownMenuCheckboxItem 
                    key={filter}
                    checked={activeFilter === filter} 
                    onCheckedChange={() => setActiveFilter(filter)} 

                    className="hover:bg-[#1E293B] cursor-pointer"
                  >
                    {filter}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search indicator..." 
                className="bg-[#0E1421] border text-gray-300 text-xs rounded-sm pl-9 pr-4 py-1.5 w-[220px] focus:outline-none focus:border-gray-500 transition-colors"
                style={{ borderColor: COLORS.border }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center h-full border-l pl-6" style={{ borderColor: COLORS.border }}>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-1">Global Hit Rate ({activeFilter})</span>
            <div className="flex items-end gap-3">
              <span className="text-3xl font-bold" style={{ color: currentData.trendColor || "#34D399" }}>{currentData.hitRate}</span>
            </div>
            <span className="text-[11px] font-bold mt-1" style={{ color: currentData.trendColor || "#34D399" }}>{currentData.hitRateTrend}</span>
          </div>
        </div>
      </div>

      {/* CHART SECTION */}
      <div className="p-5 rounded-xl border flex flex-col gap-6" style={{ backgroundColor: COLORS.cardSurface, borderColor: COLORS.border }}>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">{activeFilter} Prediction Accuracy (12M)</h3>
          <div className="flex items-center gap-4 text-xs font-bold text-gray-300">
             <div className="flex items-center gap-1.5">
               <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#34D399" }}></div>
               Predicted
             </div>
             <div className="flex items-center gap-1.5">
               <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#475569" }}></div>
               Actual
             </div>
          </div>
        </div>

        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={currentData.chart} margin={{ top: 10, right: 0, left: -20, bottom: 0 }} barGap={0}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F293D" vertical={false} />
              <XAxis dataKey="name" stroke="#475569" tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} dy={10} />
              <YAxis stroke="#475569" tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 700 }} tickFormatter={(val) => `${val}`} axisLine={false} tickLine={false} dx={-10} />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ backgroundColor: '#0E1421', border: `1px solid ${COLORS.border}`, borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}
                itemStyle={{ color: '#E2E8F0' }}
              />
              <Bar dataKey="actual" fill="#475569" radius={[2, 2, 0, 0]} barSize={12} />
              <Bar dataKey="predicted" fill="#34D399" radius={[2, 2, 0, 0]} barSize={12} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="rounded-xl border overflow-hidden" style={{ backgroundColor: COLORS.cardSurface, borderColor: COLORS.border }}>
        <div className="flex justify-between items-center p-5 border-b" style={{ borderColor: COLORS.border }}>
          <h3 className="text-lg font-bold text-white">Historical Log</h3>
          <button className="flex items-center gap-2 text-[11px] font-bold text-gray-300 hover:text-white transition-colors uppercase">
            <Download className="w-3.5 h-3.5" />
            Export_CSV
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-[10px] font-bold text-gray-500 tracking-wider uppercase" style={{ borderColor: COLORS.border }}>
                <th className="py-4 px-5">Date</th>
                <th className="py-4 px-5">Event</th>
                <th className="py-4 px-5">Predicted</th>
                <th className="py-4 px-5">Actual</th>
                <th className="py-4 px-5">Delta</th>
                <th className="py-4 px-5">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-gray-200">
              {currentData.history.map((row: any, idx: number) => (
                <tr key={idx} className="border-b last:border-0 hover:bg-white/5 transition-colors" style={{ borderColor: COLORS.border }}>
                  <td className="py-4 px-5 text-[#38BDF8] font-mono text-xs">{row.date}</td>
                  <td className="py-4 px-5 text-[#E2E8F0] font-bold text-xs">{row.event}</td>
                  <td className="py-4 px-5 font-mono text-xs text-[#F8FAFC]">{row.predicted}</td>
                  <td className="py-4 px-5 font-mono text-xs text-[#F8FAFC]">{row.actual}</td>
                  <td className="py-4 px-5 font-mono text-xs">
                    <span style={{ color: row.deltaColor }}>
                      {row.delta}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    {row.status === "HIT" && (
                      <div className="inline-flex items-center px-2 py-0.5 rounded-sm bg-[#10B981] text-white text-[10px] font-bold uppercase tracking-wider">Hit</div>
                    )}
                    {row.status === "MISS" && (
                      <div className="inline-flex items-center px-2 py-0.5 rounded-sm bg-[#EF4444] text-white text-[10px] font-bold uppercase tracking-wider">Miss</div>
                    )}
                    {row.status === "EXACT" && (
                      <div className="inline-flex items-center px-2 py-0.5 rounded-sm bg-[#475569] text-white text-[10px] font-bold uppercase tracking-wider">Exact</div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
