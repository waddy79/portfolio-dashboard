"use client";

import { EnrichedHolding, Period } from "../data/types";

const MONO = "'JetBrains Mono', 'Courier New', monospace";

const PERIOD_LABELS: Record<Period, string> = {
  return: "YOUR RETURN",
  "1d":   "1D",
  "7d":   "1W",
  "30d":  "1M",
  ytd:    "YTD",
};

function getPeriodValue(h: EnrichedHolding, period: Period): number | null {
  switch (period) {
    case "return": return h.pctReturn;
    case "1d":     return h.pctDay;
    case "7d":     return h.pct7d;
    case "30d":    return h.pct30d;
    case "ytd":    return h.pctYtd;
  }
}

interface Props {
  holdings: EnrichedHolding[];
  loading: boolean;
  lastUpdated: Date | null;
  selectedPeriod: Period;
  onPeriodChange: (p: Period) => void;
}

export default function SummaryBar({
  holdings,
  loading,
  lastUpdated,
  selectedPeriod,
  onPeriodChange,
}: Props) {
  // UP/DOWN TODAY always based on 1d
  const withDay  = holdings.filter((h) => h.pctDay !== null);
  const upToday  = withDay.filter((h) => (h.pctDay ?? 0) > 0).length;
  const downToday = withDay.filter((h) => (h.pctDay ?? 0) < 0).length;

  // Best/worst by selected period
  const withPeriod = holdings.filter((h) => getPeriodValue(h, selectedPeriod) !== null);
  const sorted = [...withPeriod].sort(
    (a, b) => (getPeriodValue(b, selectedPeriod) ?? 0) - (getPeriodValue(a, selectedPeriod) ?? 0)
  );
  const best  = sorted[0] ?? null;
  const worst = sorted[sorted.length - 1] ?? null;

  return (
    <div
      style={{
        background: "#111827",
        border: "1px solid #1e2433",
        borderRadius: 12,
        padding: "14px 20px",
        marginBottom: 0,
      }}
    >
      {/* Row 1: Title + LIVE */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <span
          style={{
            color: "#ffffff",
            fontWeight: 900,
            fontSize: 20,
            letterSpacing: "0.12em",
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          PORTFOLIO
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            background: "rgba(34, 197, 94, 0.1)",
            border: "1px solid rgba(34, 197, 94, 0.25)",
            borderRadius: 20,
            padding: "2px 10px",
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#22C55E",
              display: "inline-block",
              boxShadow: "0 0 6px #22C55E",
              animation: "livePulse 2s ease-in-out infinite",
            }}
          />
          <span
            style={{
              color: "#22C55E",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.08em",
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            LIVE
          </span>
        </span>
        {lastUpdated && (
          <span style={{ color: "#475569", fontSize: 11, marginLeft: "auto", fontFamily: "'Inter', sans-serif" }}>
            {lastUpdated.toLocaleTimeString()}
          </span>
        )}
      </div>

      {/* Row 2: Stats */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "6px 24px",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <Stat label="POSITIONS" value={String(holdings.length)} color="#ffffff" />
        <Divider />
        {loading ? (
          <span style={{ color: "#475569", fontSize: 12, fontFamily: "'Inter', sans-serif" }}>
            Loading prices…
          </span>
        ) : (
          <>
            <Stat label="UP TODAY" value={String(upToday)} color="#22C55E" />
            <Divider />
            <Stat label="DOWN TODAY" value={String(downToday)} color="#EF4444" />

            {best && (
              <>
                <Divider />
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: "#64748b", fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", fontFamily: "'Inter', sans-serif" }}>
                    BEST
                  </span>
                  <span style={{ color: "#ffffff", fontWeight: 700, fontSize: 13, fontFamily: MONO, letterSpacing: "0.04em" }}>
                    {best.ticker}
                  </span>
                  <PctBadge value={getPeriodValue(best, selectedPeriod)} />
                </div>
              </>
            )}

            {worst && worst.ticker !== best?.ticker && (
              <>
                <Divider />
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: "#64748b", fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", fontFamily: "'Inter', sans-serif" }}>
                    WORST
                  </span>
                  <span style={{ color: "#ffffff", fontWeight: 700, fontSize: 13, fontFamily: MONO, letterSpacing: "0.04em" }}>
                    {worst.ticker}
                  </span>
                  <PctBadge value={getPeriodValue(worst, selectedPeriod)} />
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Row 3: Period selector */}
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {(Object.keys(PERIOD_LABELS) as Period[]).map((p) => {
          const active = p === selectedPeriod;
          return (
            <button
              key={p}
              onClick={() => onPeriodChange(p)}
              style={{
                background: active ? "#22C55E" : "#0F172A",
                color: active ? "#000000" : "#64748b",
                border: "1px solid",
                borderColor: active ? "#22C55E" : "#1e2433",
                borderRadius: 6,
                padding: "4px 12px",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.06em",
                cursor: "pointer",
                fontFamily: "'Inter', system-ui, sans-serif",
                transition: "all 0.15s",
              }}
            >
              {PERIOD_LABELS[p]}
            </button>
          );
        })}
      </div>

      <style>{`
        @keyframes livePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
      <span style={{ color: "#64748b", fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", fontFamily: "'Inter', sans-serif" }}>
        {label}:
      </span>
      <span style={{ color, fontWeight: 800, fontSize: 16, fontFamily: MONO, letterSpacing: "-0.02em" }}>
        {value}
      </span>
    </div>
  );
}

function Divider() {
  return (
    <div style={{ width: 1, height: 16, background: "#1e2433", alignSelf: "center" }} />
  );
}

function PctBadge({ value }: { value: number | null }) {
  if (value === null) return <span style={{ color: "#475569", fontSize: 11 }}>—</span>;
  const pos = value >= 0;
  return (
    <span
      style={{
        background: pos ? "rgba(34, 197, 94, 0.12)" : "rgba(239, 68, 68, 0.12)",
        color: pos ? "#22C55E" : "#EF4444",
        fontSize: 12,
        fontWeight: 700,
        padding: "1px 7px",
        borderRadius: 4,
        fontFamily: MONO,
        letterSpacing: "-0.02em",
      }}
    >
      {pos ? "+" : ""}{value.toFixed(2)}%
    </span>
  );
}
