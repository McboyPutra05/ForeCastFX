"use client";

/**
 * components/hero/HeroPredictionFrame.tsx
 *
 * ★ HIGH PRIORITY — This is the most critical UI component in the system.
 *
 * The Hero Prediction Frame is the first thing a trader sees on the dashboard.
 * It MUST comply with StyleGuide.md exactly:
 *
 * Visual Rules:
 * - Full-width container at the TOP of the dashboard
 * - Background: Solid #121826 (Dark Navy Slate)
 * - Border: 3px solid #10B981 (BUY) or #EF4444 (SELL) — NO gradients
 * - BUY/SELL signal text: 60pt–72pt Extra Bold, uppercase, solid signal color
 * - Event name: 24pt Bold
 * - Countdown timer: JetBrains Mono, Amber Solid #F59E0B
 * - Confidence badge: separate solid-bordered badge
 */

import { useMemo } from "react";
import type { LatestPrediction } from "@/types/prediction";
import { COLORS, HERO_BORDER_COLOR, SIGNAL_COLORS, TYPOGRAPHY } from "@/lib/constants";
import { CountdownTimer } from "./CountdownTimer";
import { ConfidenceBadge } from "./ConfidenceBadge";

interface HeroPredictionFrameProps {
  prediction: LatestPrediction;
  className?: string;
}

export function HeroPredictionFrame({ prediction, className = "" }: HeroPredictionFrameProps) {
  const {
    signal,
    signal_label,
    signal_subtitle,
    confidence_score,
    event_name,
    release_date,
    engine_metadata,
  } = prediction;

  const signalColor   = SIGNAL_COLORS[signal];
  const borderColor   = HERO_BORDER_COLOR[signal];

  /** Label for USD direction below the event name */
  const impactLabel = useMemo(() => {
    if (signal === "BUY")  return "▲ BULLISH GOLD — BAD FOR USD";
    if (signal === "SELL") return "▼ BEARISH GOLD — GOOD FOR USD";
    return "◆ NEUTRAL — MIXED SIGNALS";
  }, [signal]);

  return (
    <section
      id="hero-prediction-frame"
      aria-label="Hero Prediction Frame"
      className={`w-full ${className}`}
      style={{
        backgroundColor: COLORS.cardSurface,
        border: `3px solid ${borderColor}`,
        borderRadius: "12px",
        padding: "clamp(24px, 3vw, 40px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ------------------------------------------------------------------ */}
      {/* Background accent — subtle solid inner glow via box-shadow only    */}
      {/* ------------------------------------------------------------------ */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: `inset 0 0 60px 0 ${signalColor}10`,
          borderRadius: "9px",
          pointerEvents: "none",
        }}
      />

      {/* ------------------------------------------------------------------ */}
      {/* Header row: Event name + Impact label + Countdown                  */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 relative z-10">
        {/* Left: Event info */}
        <div className="flex flex-col gap-1">
          {/* LIVE badge */}
          <span
            className="inline-flex items-center gap-1.5 w-fit uppercase tracking-widest font-bold px-2 py-0.5"
            style={{
              fontSize: "9px",
              backgroundColor: "#DC2626",       // High Impact badge color (StyleGuide)
              color: "#FFFFFF",
              borderRadius: "4px",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: "#FFFFFF" }}
            />
            NEXT HIGH IMPACT EVENT
          </span>

          {/* Event name — 24pt Bold per StyleGuide */}
          <h1
            style={{
              fontSize: TYPOGRAPHY.heroTitle,
              fontWeight: 700,
              color: COLORS.textPrimary,
              lineHeight: 1.2,
              fontFamily: "'Inter', sans-serif",
              margin: 0,
            }}
          >
            {event_name.toUpperCase()}
          </h1>

          {/* USD impact direction label */}
          <span
            className="font-semibold uppercase tracking-wide"
            style={{ fontSize: "11px", color: signalColor }}
          >
            {impactLabel}
          </span>
        </div>

        {/* Right: Countdown timer */}
        <div className="flex flex-col items-start md:items-end gap-1">
          <span
            className="uppercase tracking-widest font-semibold"
            style={{ fontSize: "9px", color: COLORS.textSecondary }}
          >
            RELEASE IN
          </span>
          <CountdownTimer targetDate={release_date} />
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Main signal — BUY XAUUSD / SELL XAUUSD (60–72pt Extra Bold)       */}
      {/* ------------------------------------------------------------------ */}
      <div
        className="flex flex-col items-center text-center relative z-10"
        style={{
          margin: "clamp(28px, 4vw, 48px) 0 clamp(16px, 2vw, 28px)",
        }}
      >
        {/* THE BIG SIGNAL TEXT — complies with StyleGuide 60–72pt spec */}
        <h2
          id="signal-text"
          aria-live="polite"
          aria-atomic="true"
          style={{
            fontSize: TYPOGRAPHY.heroSignal,     // clamp(60px, 6vw, 72px)
            fontWeight: 800,
            fontFamily: "'Inter', sans-serif",
            color: signalColor,
            lineHeight: 0.9,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          {signal_label}
        </h2>

        {/* Subtitle — e.g. "Predicted Bias: BAD FOR USD (Dovish CPI)" */}
        <p
          style={{
            fontSize: "13px",
            color: COLORS.textSecondary,
            fontFamily: "'Inter', sans-serif",
            marginTop: "12px",
            fontStyle: "italic",
          }}
        >
          {signal_subtitle}
        </p>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Bottom row: Confidence badge + Indicator breakdown pills            */}
      {/* ------------------------------------------------------------------ */}
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10"
        style={{
          borderTop: `1px solid ${COLORS.border}`,
          paddingTop: "20px",
        }}
      >
        {/* Confidence badge */}
        <ConfidenceBadge score={confidence_score} signal={signal} />

        {/* Indicator breakdown pills */}
        {engine_metadata?.indicators && engine_metadata.indicators.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {engine_metadata.indicators.map((ind) => {
              const score = ind.weighted_score;
              const pillColor = score < 0 ? "#EF4444" : score > 0 ? "#10B981" : "#F59E0B";
              return (
                <div
                  key={ind.code}
                  title={`${ind.code}: deviation ${ind.deviation >= 0 ? "+" : ""}${ind.deviation} | score ${ind.weighted_score >= 0 ? "+" : ""}${ind.weighted_score.toFixed(3)}`}
                  style={{
                    backgroundColor: COLORS.backgroundPrimary,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: "6px",
                    padding: "4px 10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: pillColor }}
                  />
                  <span
                    className="font-mono font-semibold"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "10px",
                      color: COLORS.textSecondary,
                    }}
                  >
                    {ind.code}
                  </span>
                  <span
                    className="font-mono font-bold"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "10px",
                      color: pillColor,
                    }}
                  >
                    {ind.weighted_score >= 0 ? "+" : ""}{ind.weighted_score.toFixed(3)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
