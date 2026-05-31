"use client";

import { EnrichedHolding } from "../data/types";

const SECTOR_ORDER = [
  "Technology",
  "Aerospace & Defense",
  "Energy & Utilities",
  "Finance",
  "Healthcare",
  "Consumer",
  "Industrial",
  "Mining & Materials",
  "Crypto & Digital",
  "Telecoms",
  "ETPs & Funds",
];

const SECTOR_ICONS: Record<string, string> = {
  "Technology": "💻",
  "Aerospace & Defense": "🚀",
  "Energy & Utilities": "⚡",
  "Finance": "🏦",
  "Healthcare": "🧬",
  "Consumer": "🛒",
  "Industrial": "⚙️",
  "Mining & Materials": "⛏️",
  "Crypto & Digital": "₿",
  "Telecoms": "📡",
  "ETPs & Funds": "📦",
};

function getHeatColor(pct: number | null): string {
  if (pct === null) return "#1e293b";   // neutral slate
  if (pct >= 5)  return "#16a34a";      // bright green
  if (pct >= 2)  return "#15803d";      // medium green
  if (pct >= 0)  return "#14532d";      // dark green
  if (pct >= -2) return "#7f1d1d";      // dark red
  if (pct >= -5) return "#991b1b";      // medium red
  return "#b91c1c";                      // bright red
}

function HeatTile({
  holding,
  loading,
}: {
  holding: EnrichedHolding;
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="animate-pulse bg-slate-800 rounded h-[84px] w-[96px]" />
    );
  }

  const pct = holding.pctReturn;
  const color = getHeatColor(pct);

  return (
    <div
      style={{ backgroundColor: color }}
      className="flex flex-col items-center justify-center rounded transition-opacity hover:opacity-80 h-[84px] w-[96px] px-1 overflow-hidden cursor-default select-none"
      title={`${holding.name} — ${holding.sector}${pct !== null ? ` — Your return: ${pct >= 0 ? "+" : ""}${pct.toFixed(2)}%` : ""}`}
    >
      <span className="text-white font-bold text-sm leading-tight tracking-wide truncate max-w-full px-1 text-center">
        {holding.ticker}
      </span>
      <span className="text-white/60 text-[9px] truncate max-w-full px-1 text-center leading-tight mt-0.5">
        {holding.name.length > 14 ? holding.name.slice(0, 13) + "…" : holding.name}
      </span>
      {pct !== null ? (
        <span
          className="text-[11px] font-mono font-bold mt-1"
          style={{ color: pct >= 0 ? "#bbf7d0" : "#fecaca" }}
        >
          {pct >= 0 ? "+" : ""}
          {pct.toFixed(1)}%
        </span>
      ) : (
        <span className="text-[11px] text-white/30 mt-1">—</span>
      )}
    </div>
  );
}

export default function HeatmapView({
  holdings,
  loading,
}: {
  holdings: EnrichedHolding[];
  loading: boolean;
}) {
  // Group by sector
  const bySector = new Map<string, EnrichedHolding[]>();
  for (const h of holdings) {
    const s = h.sector ?? "Other";
    if (!bySector.has(s)) bySector.set(s, []);
    bySector.get(s)!.push(h);
  }

  // Sort sectors per SECTOR_ORDER, append unlisted sectors at end
  const ordered: [string, EnrichedHolding[]][] = [];
  for (const s of SECTOR_ORDER) {
    if (bySector.has(s)) ordered.push([s, bySector.get(s)!]);
  }
  for (const [s, v] of bySector) {
    if (!SECTOR_ORDER.includes(s)) ordered.push([s, v]);
  }

  // Legend
  const legend = [
    { label: "> +5%", color: "#16a34a" },
    { label: "+2–5%", color: "#15803d" },
    { label: "0–2%", color: "#14532d" },
    { label: "0 to −2%", color: "#7f1d1d" },
    { label: "−2–5%", color: "#991b1b" },
    { label: "< −5%", color: "#b91c1c" },
  ];

  return (
    <div className="space-y-1">
      {/* Color legend */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="text-slate-600 text-xs">Your return:</span>
        {legend.map((l) => (
          <span key={l.label} className="flex items-center gap-1">
            <span
              className="inline-block w-3 h-3 rounded-sm"
              style={{ backgroundColor: l.color }}
            />
            <span className="text-slate-500 text-xs">{l.label}</span>
          </span>
        ))}
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-sm bg-slate-700" />
          <span className="text-slate-500 text-xs">No data</span>
        </span>
      </div>

      {ordered.map(([sector, stocks]) => (
        <div key={sector} className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm">{SECTOR_ICONS[sector] ?? "•"}</span>
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-widest">
              {sector}
            </h3>
            <span className="text-slate-700 text-xs">({stocks.length})</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {stocks.map((h) => (
              <HeatTile key={h.ticker} holding={h} loading={loading} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
