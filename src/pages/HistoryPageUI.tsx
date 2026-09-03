"use client";

import { useState, useEffect } from "react";
import { COLORS } from "@/lib/constants";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { Download, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetchHistoricalReleases } from "@/lib/api/history";

type Indicator = "ALL" | "CPI" | "NFP" | "GDP" | "PMI" | "FOMC" | "PPI" | "Retail Sales";

export function HistoryPageUI({ 
  accuracySummary, 
  initialHistoryData 
}: { 
  accuracySummary: any, 
  initialHistoryData: any 
}) {
  const [activeFilter, setActiveFilter] = useState<Indicator>("ALL");
  const [historyData, setHistoryData] = useState(initialHistoryData);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (activeFilter === "ALL") {
      setHistoryData(initialHistoryData);
      return;
    }
    
    let isMounted = true;
    setIsLoading(true);
    fetchHistoricalReleases(activeFilter).then(data => {
      if (isMounted) {
        setHistoryData(data);
        setIsLoading(false);
      }
    }).catch(err => {
      console.error(err);
      if (isMounted) setIsLoading(false);
    });
    
    return () => { isMounted = false; };
  }, [activeFilter, initialHistoryData]);

  // Find accuracy for current filter or overall
  let currentAccuracy = null;
  if (accuracySummary) {
    if (activeFilter === "ALL") {
      currentAccuracy = {
        hitRate: `${accuracySummary.overall_accuracy_pct}%`,
        hitRateTrend: "Overall Performance",
        trendColor: "#34D399"
      };
    } else {
      const spec = accuracySummary.accuracy_by_event?.find((e: any) => e.event_code === activeFilter);
      if (spec) {
        currentAccuracy = {
          hitRate: `${spec.accuracy_pct}%`,
          hitRateTrend: `${spec.correct_predictions} / ${spec.total_predictions} correct`,
          trendColor: spec.accuracy_pct >= 50 ? "#34D399" : "#EF4444"
        };
      }
    }
  }
  
  if (!currentAccuracy) {
    currentAccuracy = {
      hitRate: "N/A",
      hitRateTrend: "No predictions yet",
      trendColor: "#94A3B8"
    };
  }

  // Transform releases to chart format (last 6)
  const chartData = [...(historyData?.releases || [])]
    .reverse()
    .slice(-6)
    .map((r: any) => ({
      name: new Date(r.release_date).toLocaleDateString('en-US', { month: 'short' }),
      predicted: r.predicted_signal === "BUY" ? 1 : r.predicted_signal === "SELL" ? -1 : 0, // Placeholder mapping since we don't predict values anymore
      actual: r.is_correct ? 1 : (r.is_correct === false ? -1 : 0),
    }));

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
                {(["ALL", "CPI", "NFP", "GDP", "PMI", "FOMC", "PPI", "Retail Sales"] as Indicator[]).map((filter) => (
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
              <span className="text-3xl font-bold" style={{ color: currentAccuracy.trendColor }}>{currentAccuracy.hitRate}</span>
            </div>
            <span className="text-[11px] font-bold mt-1" style={{ color: currentAccuracy.trendColor }}>{currentAccuracy.hitRateTrend}</span>
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

        <div className="h-[250px] w-full min-w-0 min-h-[250px]">
          {isMounted ? (
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={250}>
              <BarChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }} barGap={0}>
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
          ) : (
            <div className="h-[250px] w-full flex items-center justify-center text-xs text-gray-500">
              Loading chart...
            </div>
          )}
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
            <tbody className="text-xs font-medium text-gray-300">
              {historyData?.releases?.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    {isLoading ? "Loading..." : "No historical data available."}
                  </td>
                </tr>
              ) : (
                historyData?.releases?.map((row: any, idx: number) => {
                  const isHit = row.is_correct === true;
                  const isMiss = row.is_correct === false;
                  
                  return (
                    <tr key={idx} className="border-b transition-colors hover:bg-white/5" style={{ borderColor: COLORS.border }}>
                      <td className="py-4 px-5" suppressHydrationWarning>{new Date(row.release_date).toLocaleDateString('en-US')}</td>
                      <td className="py-4 px-5">{row.event_name}</td>
                      <td className="py-4 px-5">
                        {row.predicted_signal ? (
                          <span className={`px-2 py-1 rounded-sm text-[10px] font-bold ${row.predicted_signal === 'BUY' ? 'bg-[#34D399]/20 text-[#34D399]' : 'bg-[#EF4444]/20 text-[#EF4444]'}`}>
                            {row.predicted_signal}
                          </span>
                        ) : "—"}
                      </td>
                      <td className="py-4 px-5">{row.actual_value ?? "—"}</td>
                      <td className="py-4 px-5">
                        {row.forecast_value !== null && row.actual_value !== null 
                          ? `${row.actual_value - row.forecast_value > 0 ? '+' : ''}${(row.actual_value - row.forecast_value).toFixed(2)}` 
                          : "—"}
                      </td>
                      <td className="py-4 px-5">
                        {isHit ? (
                          <span className="px-2 py-1 rounded-sm bg-[#34D399]/20 text-[#34D399] text-[10px] font-bold tracking-wider">HIT</span>
                        ) : isMiss ? (
                          <span className="px-2 py-1 rounded-sm bg-[#EF4444]/20 text-[#EF4444] text-[10px] font-bold tracking-wider">MISS</span>
                        ) : (
                          <span className="px-2 py-1 rounded-sm bg-[#94A3B8]/20 text-[#94A3B8] text-[10px] font-bold tracking-wider">PENDING</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default HistoryPageUI;
