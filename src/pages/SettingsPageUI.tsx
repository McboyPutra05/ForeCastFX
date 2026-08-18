"use client";

import { useState } from "react";
import { COLORS } from "@/lib/constants";
import { RefreshCw, TrendingUp, AlertTriangle } from "lucide-react";

export function SettingsPageUI() {
  const [monospaceDensity, setMonospaceDensity] = useState(true);
  const [compactMode, setCompactMode] = useState(false);
  const [highImpactEvents, setHighImpactEvents] = useState(true);
  const [modelPredictionAlerts, setModelPredictionAlerts] = useState(true);
  const [fontScaling, setFontScaling] = useState(14);

  return (
    <main
      className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-5"
      style={{ backgroundColor: COLORS.backgroundPrimary }}
    >
      <div className="flex flex-col gap-1 mb-2">
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: COLORS.textPrimary }}>
          Terminal Settings
        </h2>
        <p style={{ fontSize: "13px", color: COLORS.textSecondary, fontWeight: 500 }}>
          Manage your institutional trading environment preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* ACCOUNT PROFILE */}
        <div className="p-5 rounded-md border flex flex-col gap-6" style={{ backgroundColor: COLORS.cardSurface, borderColor: COLORS.border }}>
          <h3 className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-[-10px]">Account Profile</h3>
          
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold text-gray-300">API Key (Read Only)</label>
            <input 
              type="password" 
              defaultValue="12345678901234567890" 
              className="bg-white text-black text-sm px-3 py-2 rounded-sm focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold text-gray-300">Webhook URL</label>
            <input 
              type="text" 
              defaultValue="https://your-server.com/webhook" 
              className="bg-white text-black text-sm px-3 py-2 rounded-sm focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2 mt-1">
            <label className="text-[11px] font-bold text-gray-300">Current Plan</label>
            <div className="flex items-center gap-3">
              <span className="px-2 py-1 rounded bg-[#064E3B] text-[#34D399] text-[10px] font-bold tracking-wider uppercase">Pro Tier</span>
              <span className="text-xs font-bold text-gray-300">Billed Annually</span>
            </div>
          </div>
        </div>

        {/* TRADING PAIR FOCUS */}
        <div className="p-5 rounded-md border flex flex-col gap-5" style={{ backgroundColor: COLORS.cardSurface, borderColor: COLORS.border }}>
          <h3 className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-[-5px]">Trading Pair Focus</h3>
          
          <div className="flex flex-col gap-3">
            {/* Pair 1 */}
            <div className="flex items-center justify-between p-3 rounded-md bg-[#0E1421] border border-transparent">
               <div className="flex items-center gap-4">
                 <div className="w-8 h-8 rounded border border-[#1F293D] flex items-center justify-center text-[#34D399]">
                   <RefreshCw className="w-4 h-4" />
                 </div>
                 <div className="flex flex-col">
                   <span className="text-sm font-bold text-white">XAU/USD</span>
                   <span className="text-[11px] font-bold text-gray-400">Gold / US Dollar</span>
                 </div>
               </div>
               <ToggleSwitch checked={true} onChange={() => {}} />
            </div>

            {/* Pair 2 */}
            <div className="flex items-center justify-between p-3 rounded-md bg-[#0E1421] border border-transparent">
               <div className="flex items-center gap-4">
                 <div className="w-8 h-8 rounded border border-[#1F293D] flex items-center justify-center text-gray-300">
                   <span className="font-bold text-[16px]">€</span>
                 </div>
                 <div className="flex flex-col">
                   <span className="text-sm font-bold text-white">EUR/USD</span>
                   <span className="text-[11px] font-bold text-gray-400">Euro / US Dollar</span>
                 </div>
               </div>
               <ToggleSwitch checked={false} onChange={() => {}} />
            </div>

            {/* Pair 3 */}
            <div className="flex items-center justify-between p-3 rounded-md bg-[#0E1421] border border-transparent">
               <div className="flex items-center gap-4">
                 <div className="w-8 h-8 rounded border border-[#1F293D] flex items-center justify-center text-gray-300">
                   <span className="font-bold text-[16px]">¥</span>
                 </div>
                 <div className="flex flex-col">
                   <span className="text-sm font-bold text-white">USD/JPY</span>
                   <span className="text-[11px] font-bold text-gray-400">US Dollar / Japanese Yen</span>
                 </div>
               </div>
               <ToggleSwitch checked={false} onChange={() => {}} />
            </div>
          </div>
        </div>
      </div>

      {/* TERMINAL DISPLAY */}
      <div className="p-5 rounded-md border flex flex-col gap-6 mt-1" style={{ backgroundColor: COLORS.cardSurface, borderColor: COLORS.border }}>
        <h3 className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-[-10px]">Terminal Display</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold text-white">Monospace Density</span>
                <span className="text-[10px] font-bold text-gray-400">Force JetBrains Mono on all panels</span>
              </div>
              <ToggleSwitch checked={monospaceDensity} onChange={setMonospaceDensity} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold text-white">Compact Mode</span>
                <span className="text-[10px] font-bold text-gray-400">Reduce padding to maximize data</span>
              </div>
              <ToggleSwitch checked={compactMode} onChange={setCompactMode} />
            </div>
          </div>

          <div className="flex flex-col gap-5 pl-0 md:pl-8 border-t md:border-t-0 md:border-l pt-6 md:pt-0" style={{ borderColor: COLORS.border }}>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-gray-400">Base Font Scaling</span>
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-gray-300">12px</span>
                <input 
                  type="range" 
                  min="12" 
                  max="16" 
                  value={fontScaling} 
                  onChange={(e) => setFontScaling(Number(e.target.value))}
                  className="flex-1 accent-[#34D399]" 
                />
                <span className="text-xs font-bold text-gray-300">16px</span>
              </div>
            </div>

            <div className="bg-[#0E1421] rounded-md p-3 border border-transparent">
              <span className="font-mono font-bold text-[13px] text-[#34D399]">
                Preview: 1.0543 (BID) / 1.0545 (ASK)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* NOTIFICATION PREFERENCES */}
      <div className="p-5 rounded-md border flex flex-col gap-5 mt-1" style={{ backgroundColor: COLORS.cardSurface, borderColor: COLORS.border }}>
        <h3 className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-[-5px]">Notification Preferences</h3>
        
        <div className="flex flex-col gap-3">
          <div className={`flex items-center justify-between p-4 rounded-md border ${highImpactEvents ? 'bg-transparent' : 'bg-[#0E1421]'}`} style={{ borderColor: COLORS.border }}>
            <div className="flex items-center gap-4">
              <AlertTriangle className="w-5 h-5 text-[#EF4444]" />
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold text-white">High Impact Macro Events</span>
                <span className="text-[10px] font-bold text-gray-400">Fed Rate Decisions, NFP, CPI releases.</span>
              </div>
            </div>
            <ToggleSwitch checked={highImpactEvents} onChange={setHighImpactEvents} />
          </div>

          <div className={`flex items-center justify-between p-4 rounded-md border ${modelPredictionAlerts ? 'border-[#34D399] bg-transparent' : 'border-gray-800 bg-[#0E1421]'}`}>
            <div className="flex items-center gap-4">
              <TrendingUp className="w-5 h-5 text-[#34D399]" />
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold text-white">Model Prediction Alerts</span>
                <span className="text-[10px] font-bold text-gray-400">Push notifications when predictive models trigger a confidence threshold &gt; 88%.</span>
              </div>
            </div>
            <ToggleSwitch checked={modelPredictionAlerts} onChange={setModelPredictionAlerts} />
          </div>
        </div>
      </div>

    </main>
  );
}

function ToggleSwitch({ checked, onChange }: { checked: boolean, onChange: (c: boolean) => void }) {
  return (
    <div 
      className={`relative w-9 h-5 flex items-center rounded-sm cursor-pointer transition-colors ${checked ? 'bg-[#3B82F6]' : 'bg-[#E2E8F0]'} shrink-0`}
      onClick={() => onChange(!checked)}
    >
      <div 
        className={`absolute w-3.5 h-3.5 bg-white rounded-full shadow-sm transition-transform ${checked ? 'translate-x-4' : 'translate-x-1'}`} 
        style={{ backgroundColor: checked ? 'white' : 'white' }}
      />
      {!checked && (
        <div 
        className={`absolute w-3.5 h-3.5 bg-[#475569] rounded-sm shadow-sm transition-transform translate-x-1`} 
      />
      )}
    </div>
  );
}
