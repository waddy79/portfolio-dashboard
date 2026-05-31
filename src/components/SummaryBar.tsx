"use client";

import { EnrichedHolding } from "../data/types";

interface Props {
  holdings: EnrichedHolding[];
  loading: boolean;
  lastUpdated: Date | null;
}

export default function SummaryBar({ holdings, loading, lastUpdated }: Props) {
  const withData = holdings.filter((h) => h.pctDay !== null);
  const upCount = withData.filter((h) => (h.pctDay ?? 0) > 0).length;
  const downCount = withData.filter((h) => (h.pctDay ?? 0) < 0).length;
  const flatCount = withData.filter((h) => h.pctDay === 0).length;

  const sorted = [...withData].sort((a, b) => (b.pctDay ?? 0) - (a.pctDay ?? 0));
  const best = sorted[0];
  const worst = sorted[sorted.length - 1];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl px-5 py-3 flex flex-wrap gap-x-8 gap-y-2 items-center text-sm">
      {/* Positions */}
      <div className="flex items-center gap-2">
        <span className="text-slate-500 text-xs uppercase tracking-wider font-medium">Positions</span>
        <span className="text-white font-bold text-base">{holdings.length}</span>
      </div>

      <div className="h-4 w-px bg-slate-800 hidden sm:block" />

      {/* Up / Down counts */}
      {loading ? (
        <span className="text-slate-600 text-xs animate-pulse">Loading prices…</span>
      ) : (
        <>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="text-emerald-400 text-base font-bold">{upCount}</span>
              <span className="text-slate-500 text-xs">▲</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="text-red-400 text-base font-bold">{downCount}</span>
              <span className="text-slate-500 text-xs">▼</span>
            </span>
            {flatCount > 0 && (
              <span className="flex items-center gap-1">
                <span className="text-slate-400 text-base font-bold">{flatCount}</span>
                <span className="text-slate-500 text-xs">—</span>
              </span>
            )}
          </div>

          <div className="h-4 w-px bg-slate-800 hidden sm:block" />

          {best && (
            <div className="flex items-center gap-2">
              <span className="text-slate-500 text-xs uppercase tracking-wider">Best</span>
              <span className="font-mono font-bold text-emerald-400">{best.ticker}</span>
              <span className="text-emerald-300 font-mono text-xs">
                +{best.pctDay?.toFixed(2)}%
              </span>
            </div>
          )}

          {worst && worst.ticker !== best?.ticker && (
            <div className="flex items-center gap-2">
              <span className="text-slate-500 text-xs uppercase tracking-wider">Worst</span>
              <span className="font-mono font-bold text-red-400">{worst.ticker}</span>
              <span className="text-red-300 font-mono text-xs">
                {worst.pctDay?.toFixed(2)}%
              </span>
            </div>
          )}

          {lastUpdated && (
            <div className="ml-auto flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-slate-500 text-xs">
                Updated {lastUpdated.toLocaleTimeString()}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
