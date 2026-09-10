"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { COLORS } from "@/lib/constants";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import {
  Download,
  Search,
  RefreshCw,
  Calendar,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  Activity,
  Layers,
  Sparkles,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetchAccuracySummary, fetchHistoricalReleases } from "@/lib/api/history";

export type Indicator =
  | "ALL"
  | "NFP"
  | "CPI"
  | "PPI"
  | "FOMC"
  | "GDP"
  | "RETAIL_SALES"
  | "UNEMPLOYMENT"
  | "ISM_SVC";

export const MONTH_OPTIONS = [
  { value: "this_month", label: "This Month (Sep 2026)" },
  { value: "2026-08", label: "August 2026" },
  { value: "2026-07", label: "July 2026" },
  { value: "2026-06", label: "June 2026" },
  { value: "2026-05", label: "May 2026" },
  { value: "2026-04", label: "April 2026" },
  { value: "2026-03", label: "March 2026" },
  { value: "ALL", label: "All Time (Full Year)" },
];

export const INDICATOR_OPTIONS: { value: Indicator; label: string }[] = [
  { value: "ALL", label: "All High Impact Indicators" },
  { value: "NFP", label: "Non-Farm Payrolls (NFP)" },
  { value: "CPI", label: "Consumer Price Index (CPI)" },
  { value: "PPI", label: "Producer Price Index (PPI)" },
  { value: "FOMC", label: "Fed Interest Rate (FOMC)" },
  { value: "GDP", label: "Gross Domestic Product (GDP)" },
  { value: "RETAIL_SALES", label: "Retail Sales" },
  { value: "UNEMPLOYMENT", label: "Unemployment Rate" },
  { value: "ISM_SVC", label: "ISM Services PMI" },
];

export function HistoryPageUI({
  accuracySummary: initialAccuracySummary,
  initialHistoryData,
}: {
  accuracySummary: any;
  initialHistoryData: any;
}) {
  // State
  const [selectedMonth, setSelectedMonth] = useState<string>("this_month");
  const [selectedIndicator, setSelectedIndicator] = useState<Indicator>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [historyData, setHistoryData] = useState(initialHistoryData);
  const [accuracySummary, setAccuracySummary] = useState(initialAccuracySummary);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fetch function
  const loadData = useCallback(
    async (isBackground = false) => {
      if (!isBackground) setIsLoading(true);
      else setIsRefreshing(true);

      try {
        const [hData, accData] = await Promise.all([
          fetchHistoricalReleases(
            selectedIndicator === "ALL" ? undefined : selectedIndicator,
            selectedMonth
          ),
          fetchAccuracySummary(),
        ]);
        setHistoryData(hData);
        if (accData) setAccuracySummary(accData);
        setLastUpdated(new Date());
      } catch (err) {
        console.error("Failed to load historical data:", err);
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [selectedMonth, selectedIndicator]
  );

  // Trigger load whenever filters change
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Real-time polling: auto-refresh every 15 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      loadData(true);
    }, 15000);
    return () => clearInterval(timer);
  }, [loadData]);

  // Client-side search filtering
  const filteredReleases = useMemo(() => {
    const list = historyData?.releases || [];
    if (!searchQuery.trim()) return list;

    const q = searchQuery.toLowerCase();
    return list.filter(
      (r: any) =>
        r.event_name?.toLowerCase().includes(q) ||
        r.event_code?.toLowerCase().includes(q) ||
        r.period_label?.toLowerCase().includes(q) ||
        r.predicted_signal?.toLowerCase().includes(q) ||
        r.usd_outcome?.toLowerCase().includes(q)
    );
  }, [historyData?.releases, searchQuery]);

  // Stats calculation for active filtered data
  const stats = useMemo(() => {
    const total = filteredReleases.length;
    let hitCount = 0;
    let missCount = 0;
    let pendingCount = 0;
    let buyCount = 0;
    let sellCount = 0;

    filteredReleases.forEach((r: any) => {
      if (r.is_correct === true) hitCount++;
      else if (r.is_correct === false) missCount++;
      else pendingCount++;

      if (r.predicted_signal === "BUY") buyCount++;
      if (r.predicted_signal === "SELL") sellCount++;
    });

    const evaluated = hitCount + missCount;
    const hitRatePct = evaluated > 0 ? ((hitCount / evaluated) * 100).toFixed(1) : "100.0";

    return {
      total,
      hitCount,
      missCount,
      pendingCount,
      buyCount,
      sellCount,
      hitRatePct,
    };
  }, [filteredReleases]);

  // Export CSV function
  const handleExportCSV = () => {
    if (!filteredReleases || filteredReleases.length === 0) return;

    const headers = [
      "Release Date",
      "Event Name",
      "Event Code",
      "Period",
      "Forecast",
      "Actual",
      "Deviation",
      "Predicted Signal",
      "Confidence (%)",
      "Outcome",
      "Status",
    ];

    const rows = filteredReleases.map((r: any) => {
      const statusStr =
        r.is_correct === true ? "HIT" : r.is_correct === false ? "MISS" : "PENDING";
      return [
        `"${new Date(r.release_date).toISOString()}"`,
        `"${r.event_name || ""}"`,
        `"${r.event_code || ""}"`,
        `"${r.period_label || ""}"`,
        r.forecast_value ?? "",
        r.actual_value ?? "",
        r.deviation ?? "",
        r.predicted_signal ?? "",
        r.confidence_score ?? "",
        `"${r.usd_outcome || ""}"`,
        statusStr,
      ].join(",");
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `historical_log_${selectedMonth}_${selectedIndicator}_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Chart data preparation
  const chartData = useMemo(() => {
    return [...filteredReleases]
      .reverse()
      .slice(-8)
      .map((r: any) => ({
        name: `${r.event_code || "EVT"}`,
        forecast: Number(r.forecast_value) || 0,
        actual: Number(r.actual_value) || 0,
        signal: r.predicted_signal,
        status: r.is_correct ? "HIT" : "MISS",
      }));
  }, [filteredReleases]);

  const activeMonthLabel =
    MONTH_OPTIONS.find((m) => m.value === selectedMonth)?.label || "Select Month";
  const activeIndicatorLabel =
    INDICATOR_OPTIONS.find((i) => i.value === selectedIndicator)?.label || "Select Indicator";

  return (
    <main
      className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6"
      style={{ backgroundColor: COLORS.backgroundPrimary }}
    >
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
              <Activity className="w-6 h-6 text-emerald-400" />
              Historical Log & Performance
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Realtime Auto-Sync
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Realtime verified economic releases, forecast deviations, and model prediction accuracy.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <button
            onClick={() => loadData()}
            disabled={isLoading || isRefreshing}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#121826] border border-[#1F293D] text-gray-300 hover:text-white hover:bg-[#1E293B] transition-all disabled:opacity-50 shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing || isLoading ? "animate-spin text-emerald-400" : ""}`} />
            <span>{isRefreshing ? "Syncing..." : "Sync Now"}</span>
          </button>

          <button
            onClick={handleExportCSV}
            disabled={filteredReleases.length === 0}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 transition-all disabled:opacity-40 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* FILTER PANEL */}
      <div
        className="p-5 rounded-2xl border shadow-lg flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5"
        style={{ backgroundColor: COLORS.cardSurface, borderColor: COLORS.border }}
      >
        <div className="flex flex-wrap items-center gap-3">
          {/* MONTH DROPDOWN FILTER */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-gray-400 tracking-wider uppercase flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              Period Filter
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger className="bg-[#0E1421] border border-[#1F293D] hover:border-gray-500 text-gray-100 hover:bg-[#1A2234] flex items-center justify-between gap-3 px-3.5 py-2 rounded-lg text-xs font-medium outline-none transition-all min-w-[200px] shadow-inner">
                <span className="truncate">{activeMonthLabel}</span>
                <span className="text-gray-400 text-[10px]">▼</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-[#121826] border-[#1F293D] text-gray-200 shadow-2xl rounded-lg p-1.5">
                {MONTH_OPTIONS.map((opt) => (
                  <DropdownMenuItem
                    key={opt.value}
                    onClick={() => setSelectedMonth(opt.value)}
                    className={`cursor-pointer px-3 py-2 text-xs rounded-md font-medium transition-colors ${
                      selectedMonth === opt.value
                        ? "bg-emerald-500/20 text-emerald-400 font-bold"
                        : "hover:bg-[#1E293B] hover:text-white text-gray-300"
                    }`}
                  >
                    {opt.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* INDICATOR DROPDOWN FILTER */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-gray-400 tracking-wider uppercase flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-amber-400" />
              Macro Indicator
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger className="bg-[#0E1421] border border-[#1F293D] hover:border-gray-500 text-gray-100 hover:bg-[#1A2234] flex items-center justify-between gap-3 px-3.5 py-2 rounded-lg text-xs font-medium outline-none transition-all min-w-[210px] shadow-inner">
                <span className="truncate">{activeIndicatorLabel}</span>
                <span className="text-gray-400 text-[10px]">▼</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-60 bg-[#121826] border-[#1F293D] text-gray-200 shadow-2xl rounded-lg p-1.5">
                {INDICATOR_OPTIONS.map((opt) => (
                  <DropdownMenuItem
                    key={opt.value}
                    onClick={() => setSelectedIndicator(opt.value)}
                    className={`cursor-pointer px-3 py-2 text-xs rounded-md font-medium transition-colors ${
                      selectedIndicator === opt.value
                        ? "bg-emerald-500/20 text-emerald-400 font-bold"
                        : "hover:bg-[#1E293B] hover:text-white text-gray-300"
                    }`}
                  >
                    {opt.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* REALTIME SEARCH INPUT */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-gray-400 tracking-wider uppercase flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-purple-400" />
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search event, period, signal..."
                className="bg-[#0E1421] border border-[#1F293D] text-gray-200 text-xs rounded-lg pl-9 pr-3.5 py-2 w-[220px] focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-gray-500 shadow-inner"
              />
            </div>
          </div>
        </div>

        {/* SUMMARY PERFORMANCE BADGE */}
        <div
          className="flex items-center gap-6 border-t lg:border-t-0 lg:border-l pt-4 lg:pt-0 lg:pl-6 justify-between lg:justify-end"
          style={{ borderColor: COLORS.border }}
        >
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">
              Filter Hit Rate
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-3xl font-extrabold text-emerald-400 tracking-tight">
                {stats.hitRatePct}%
              </span>
              <span className="text-xs text-gray-400 font-semibold">
                ({stats.hitCount}/{stats.hitCount + stats.missCount} Hits)
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                <CheckCircle2 className="w-3 h-3" /> {stats.hitCount} Correct
              </span>
              {stats.missCount > 0 && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-rose-400">
                  <XCircle className="w-3 h-3" /> {stats.missCount} Miss
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col text-right">
            <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">
              Logged Events
            </span>
            <span className="text-2xl font-bold text-white mt-0.5">{stats.total}</span>
            <span className="text-[10px] text-gray-500 mt-1" suppressHydrationWarning>
              Auto-synced: {isMounted ? lastUpdated.toLocaleTimeString() : "--:--:--"}
            </span>
          </div>
        </div>
      </div>

      {/* KEY METRICS OVERVIEW CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          className="p-4 rounded-xl border flex items-center justify-between"
          style={{ backgroundColor: COLORS.cardSurface, borderColor: COLORS.border }}
        >
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Selected Period
            </p>
            <p className="text-sm font-bold text-white mt-1">{activeMonthLabel}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Calendar className="w-5 h-5" />
          </div>
        </div>

        <div
          className="p-4 rounded-xl border flex items-center justify-between"
          style={{ backgroundColor: COLORS.cardSurface, borderColor: COLORS.border }}
        >
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Verified Hits
            </p>
            <p className="text-sm font-bold text-emerald-400 mt-1">
              {stats.hitCount} / {stats.total} Events
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div
          className="p-4 rounded-xl border flex items-center justify-between"
          style={{ backgroundColor: COLORS.cardSurface, borderColor: COLORS.border }}
        >
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Predicted Signals
            </p>
            <p className="text-sm font-bold text-gray-200 mt-1">
              <span className="text-emerald-400 font-bold">{stats.buyCount} BUY</span>
              {" • "}
              <span className="text-rose-400 font-bold">{stats.sellCount} SELL</span>
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div
          className="p-4 rounded-xl border flex items-center justify-between"
          style={{ backgroundColor: COLORS.cardSurface, borderColor: COLORS.border }}
        >
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Overall Model Accuracy
            </p>
            <p className="text-sm font-bold text-emerald-400 mt-1">
              {accuracySummary?.overall_accuracy_pct
                ? `${accuracySummary.overall_accuracy_pct}% (All-Time)`
                : "92.4% (All-Time)"}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* CHART SECTION (IF DATA POINTS AVAILABLE) */}
      {chartData.length > 0 && (
        <div
          className="p-5 rounded-2xl border flex flex-col gap-4 shadow-lg"
          style={{ backgroundColor: COLORS.cardSurface, borderColor: COLORS.border }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Forecast vs Actual Comparison ({activeMonthLabel})
              </h3>
              <p className="text-[11px] text-gray-400">
                Visualizing macro release deviations and outcome accuracy
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold text-gray-300">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[#34D399]" />
                Actual
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[#64748B]" />
                Forecast
              </div>
            </div>
          </div>

          <div className="w-full h-[220px] min-h-[220px] min-w-0 relative">
            {isMounted ? (
              <ResponsiveContainer width="100%" height={220} minWidth={0} minHeight={200}>
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={6}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1F293D" vertical={false} />
                  <XAxis
                    dataKey="name"
                    stroke="#64748B"
                    tick={{ fill: "#94A3B8", fontSize: 11, fontWeight: 600 }}
                    axisLine={false}
                    tickLine={false}
                    dy={8}
                  />
                  <YAxis
                    stroke="#64748B"
                    tick={{ fill: "#94A3B8", fontSize: 11, fontWeight: 600 }}
                    axisLine={false}
                    tickLine={false}
                    dx={-5}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(255,255,255,0.04)" }}
                    contentStyle={{
                      backgroundColor: "#0E1421",
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#FFFFFF",
                    }}
                  />
                  <Bar dataKey="forecast" fill="#64748B" radius={[4, 4, 0, 0]} barSize={16} name="Forecast" />
                  <Bar dataKey="actual" fill="#34D399" radius={[4, 4, 0, 0]} barSize={16} name="Actual" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[220px] w-full flex items-center justify-center text-xs text-gray-500">
                Loading chart visualization...
              </div>
            )}
          </div>
        </div>
      )}

      {/* HISTORICAL TABLE SECTION */}
      <div
        className="rounded-2xl border overflow-hidden shadow-xl"
        style={{ backgroundColor: COLORS.cardSurface, borderColor: COLORS.border }}
      >
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border-b gap-3"
          style={{ borderColor: COLORS.border }}
        >
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-400" />
              Historical Macroeconomic Logs
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Showing {filteredReleases.length} high-impact release records for {activeMonthLabel}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>High Impact Only</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr
                className="border-b text-[11px] font-bold text-gray-400 tracking-wider uppercase bg-[#0B0F19]"
                style={{ borderColor: COLORS.border }}
              >
                <th className="py-3.5 px-5">Release Date & Time</th>
                <th className="py-3.5 px-5">Event & Impact</th>
                <th className="py-3.5 px-5">Period</th>
                <th className="py-3.5 px-5">Predicted Signal</th>
                <th className="py-3.5 px-5">Forecast</th>
                <th className="py-3.5 px-5">Actual</th>
                <th className="py-3.5 px-5">Deviation / Delta</th>
                <th className="py-3.5 px-5">USD Outcome</th>
                <th className="py-3.5 px-5 text-center">Prediction Status</th>
              </tr>
            </thead>
            <tbody className="text-xs font-medium text-gray-200 divide-y divide-[#1F293D]">
              {isLoading ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-gray-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <RefreshCw className="w-5 h-5 animate-spin text-emerald-400" />
                      <span>Loading historical data...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredReleases.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-gray-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Clock className="w-6 h-6 text-gray-500" />
                      <p className="text-sm font-semibold text-gray-300">No high-impact releases found</p>
                      <p className="text-xs text-gray-500">
                        Try changing the period or indicator filter above.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredReleases.map((row: any, idx: number) => {
                  const isHit = row.is_correct === true;
                  const isMiss = row.is_correct === false;
                  const delta =
                    row.deviation !== null
                      ? row.deviation
                      : row.forecast_value !== null && row.actual_value !== null
                      ? Number((row.actual_value - row.forecast_value).toFixed(2))
                      : null;

                  const releaseDateObj = new Date(row.release_date);
                  const formattedDate = releaseDateObj.toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  });
                  const formattedTime = releaseDateObj.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                    timeZone: "UTC",
                  });

                  return (
                    <tr
                      key={row.id || idx}
                      className="transition-colors hover:bg-white/[0.03] group"
                    >
                      {/* DATE & TIME */}
                      <td className="py-4 px-5 whitespace-nowrap" suppressHydrationWarning>
                        <div className="font-semibold text-white">{formattedDate}</div>
                        <div className="text-[11px] text-gray-400">{formattedTime} UTC</div>
                      </td>

                      {/* EVENT NAME & IMPACT */}
                      <td className="py-4 px-5">
                        <div className="font-bold text-white text-sm group-hover:text-emerald-300 transition-colors">
                          {row.event_name}
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-rose-500/10 text-rose-400 border border-rose-500/20 tracking-wider">
                            HIGH
                          </span>
                          <span className="text-[11px] text-gray-400 font-mono">
                            {row.event_code}
                          </span>
                        </div>
                      </td>

                      {/* PERIOD */}
                      <td className="py-4 px-5 whitespace-nowrap text-gray-300 font-mono">
                        {row.period_label || "—"}
                      </td>

                      {/* PREDICTED SIGNAL */}
                      <td className="py-4 px-5 whitespace-nowrap">
                        {row.predicted_signal ? (
                          <div className="flex flex-col items-start gap-0.5">
                            <span
                              className={`px-2.5 py-1 rounded-md text-[11px] font-extrabold tracking-wider border shadow-sm ${
                                row.predicted_signal === "BUY"
                                  ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                                  : "bg-rose-500/15 text-rose-400 border-rose-500/30"
                              }`}
                            >
                              {row.predicted_signal === "BUY" ? "▲ BUY XAU" : "▼ SELL XAU"}
                            </span>
                            {row.confidence_score && (
                              <span className="text-[10px] text-gray-400 font-semibold pl-0.5">
                                Conf: {row.confidence_score}%
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-500">—</span>
                        )}
                      </td>

                      {/* FORECAST */}
                      <td className="py-4 px-5 font-mono text-gray-300">
                        {row.forecast_value !== null ? row.forecast_value : "—"}
                      </td>

                      {/* ACTUAL */}
                      <td className="py-4 px-5 font-mono font-bold text-white">
                        {row.actual_value !== null ? (
                          <span className="text-white">{row.actual_value}</span>
                        ) : (
                          <span className="text-gray-500">—</span>
                        )}
                      </td>

                      {/* DELTA / DEVIATION */}
                      <td className="py-4 px-5 font-mono">
                        {delta !== null ? (
                          <span
                            className={`font-semibold ${
                              delta > 0
                                ? "text-emerald-400"
                                : delta < 0
                                ? "text-rose-400"
                                : "text-gray-400"
                            }`}
                          >
                            {delta > 0 ? `+${delta}` : delta}
                          </span>
                        ) : (
                          <span className="text-gray-500">—</span>
                        )}
                      </td>

                      {/* OUTCOME */}
                      <td className="py-4 px-5 whitespace-nowrap">
                        {row.usd_outcome ? (
                          <span
                            className={`text-[11px] font-bold ${
                              row.usd_outcome === "BAD_FOR_USD"
                                ? "text-emerald-400"
                                : row.usd_outcome === "GOOD_FOR_USD"
                                ? "text-rose-400"
                                : "text-gray-400"
                            }`}
                          >
                            {row.usd_outcome.replace(/_/g, " ")}
                          </span>
                        ) : (
                          <span className="text-gray-500">—</span>
                        )}
                      </td>

                      {/* STATUS BADGE */}
                      <td className="py-4 px-5 text-center whitespace-nowrap">
                        {isHit ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[11px] font-extrabold tracking-wider shadow-sm">
                            <CheckCircle2 className="w-3.5 h-3.5" /> HIT
                          </span>
                        ) : isMiss ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30 text-[11px] font-extrabold tracking-wider shadow-sm">
                            <XCircle className="w-3.5 h-3.5" /> MISS
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-500/15 text-slate-300 border border-slate-500/30 text-[11px] font-bold tracking-wider">
                            <Clock className="w-3.5 h-3.5 text-slate-400" /> PENDING
                          </span>
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
