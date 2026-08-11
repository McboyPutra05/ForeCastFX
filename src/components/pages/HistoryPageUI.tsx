import { COLORS } from "@/lib/constants";

export function HistoryPageUI() {
  return (
    <main
      className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-8"
      style={{ backgroundColor: COLORS.backgroundPrimary }}
    >
      <div className="flex flex-col gap-0.5 mb-4">
        <h2 style={{ fontSize: "20px", fontWeight: 600, color: COLORS.textPrimary }}>
          Historical Logs
        </h2>
        <p style={{ fontSize: "13px", color: COLORS.textSecondary }}>
          Track record of past predictions and outcomes
        </p>
      </div>

      <div
        style={{
          backgroundColor: COLORS.cardSurface,
          border: `1px solid ${COLORS.border}`,
          borderRadius: "12px",
          padding: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: COLORS.textSecondary,
          fontSize: "13px",
        }}
      >
        History module — coming in next phase.
      </div>
    </main>
  );
}
