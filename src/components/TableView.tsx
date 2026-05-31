"use client";

import { useState, useMemo } from "react";
import { EnrichedHolding } from "../data/types";
import ChangeBadge from "./ChangeBadge";

type SortKey = "ticker" | "name" | "sector" | "pctDay" | "pct7d" | "pct30d" | "pctYtd";

const SECTOR_COLORS: Record<string, string> = {
  "Technology": "bg-indigo-900/60 text-indigo-300",
  "Aerospace & Defense": "bg-sky-900/60 text-sky-300",
  "Energy & Utilities": "bg-yellow-900/60 text-yellow-300",
  "Finance": "bg-green-900/60 text-green-300",
  "Healthcare": "bg-pink-900/60 text-pink-300",
  "Consumer": "bg-orange-900/60 text-orange-300",
  "Industrial": "bg-gray-700/60 text-gray-300",
  "Mining & Materials": "bg-amber-900/60 text-amber-300",
  "Crypto & Digital": "bg-purple-900/60 text-purple-300",
  "Telecoms": "bg-cyan-900/60 text-cyan-300",
  "ETPs & Funds": "bg-teal-900/60 text-teal-300",
};

function SectorBadge({ sector }: { sector?: string }) {
  if (!sector) return <span className="text-slate-600 text-xs">—</span>;
  const cls = SECTOR_COLORS[sector] ?? "bg-slate-800 text-slate-400";
  return (
    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${cls}`}>
      {sector}
    </span>
  );
}

export default function TableView({
  holdings,
  loading,
}: {
  holdings: EnrichedHolding[];
  loading: boolean;
}) {
  const [search, setSearch] = useState("");
  const [sectorFilter, setSectorFilter] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("pctDay");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const sectors = useMemo(
    () => [...new Set(holdings.map((h) => h.sector ?? "Other"))].sort(),
    [holdings]
  );

  const filtered = useMemo(() => {
    let result = holdings;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (h) =>
          h.ticker.toLowerCase().includes(q) ||
          h.name.toLowerCase().includes(q)
      );
    }
    if (sectorFilter) {
      result = result.filter((h) => h.sector === sectorFilter);
    }
    return [...result].sort((a, b) => {
      const av = a[sortKey as keyof EnrichedHolding];
      const bv = b[sortKey as keyof EnrichedHolding];
      if (av === null && bv === null) return 0;
      if (av === null) return 1;
      if (bv === null) return -1;
      if (typeof av === "string" && typeof bv === "string") {
        const cmp = av.localeCompare(bv);
        return sortDir === "asc" ? cmp : -cmp;
      }
      const cmp = (av as number) - (bv as number);
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [holdings, search, sectorFilter, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  function ColHeader({
    col,
    label,
    align = "right",
  }: {
    col: SortKey;
    label: string;
    align?: "left" | "right";
  }) {
    const active = sortKey === col;
    return (
      <th
        className={`py-3 px-3 font-medium cursor-pointer select-none hover:text-white transition-colors text-${align}`}
        onClick={() => toggleSort(col)}
      >
        <span className={active ? "text-white" : "text-slate-500"}>
          {label}{" "}
          {active ? (sortDir === "desc" ? "↓" : "↑") : <span className="text-slate-700">↕</span>}
        </span>
      </th>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search + sector chips */}
      <div className="flex flex-wrap gap-3 items-start">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search ticker or name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-slate-800/80 border border-slate-700 rounded-lg pl-8 pr-4 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-slate-500 w-60 transition-colors"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 items-center">
          <button
            onClick={() => setSectorFilter(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              !sectorFilter
                ? "bg-slate-600 text-white"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
            }`}
          >
            All
          </button>
          {sectors.map((s) => (
            <button
              key={s}
              onClick={() => setSectorFilter(s === sectorFilter ? null : s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                sectorFilter === s
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-slate-600">
        {filtered.length} of {holdings.length} holdings
      </p>

      <div className="overflow-x-auto rounded-xl border border-slate-800/80">
        <table className="w-full text-sm">
          <thead className="bg-slate-800/40">
            <tr>
              <ColHeader col="ticker" label="Ticker" align="left" />
              <ColHeader col="name" label="Name" align="left" />
              <ColHeader col="sector" label="Sector" align="left" />
              <ColHeader col="pctDay" label="Day %" />
              <ColHeader col="pct7d" label="7d %" />
              <ColHeader col="pct30d" label="30d %" />
              <ColHeader col="pctYtd" label="YTD %" />
            </tr>
          </thead>
          <tbody>
            {loading
              ? [...Array(12)].map((_, i) => (
                  <tr key={i} className="border-t border-slate-800/50">
                    {[...Array(7)].map((_, j) => (
                      <td key={j} className="py-3 px-3">
                        <div className="h-3.5 bg-slate-800 rounded animate-pulse" style={{ width: `${60 + (j * 11) % 40}%` }} />
                      </td>
                    ))}
                  </tr>
                ))
              : filtered.map((h) => (
                  <tr
                    key={h.ticker}
                    className="border-t border-slate-800/40 hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="py-2.5 px-3 font-mono font-bold text-white">
                      {h.ticker}
                    </td>
                    <td className="py-2.5 px-3 text-slate-300 max-w-[200px] truncate">
                      {h.name}
                    </td>
                    <td className="py-2.5 px-3">
                      <SectorBadge sector={h.sector} />
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <ChangeBadge value={h.pctDay} />
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <ChangeBadge value={h.pct7d} />
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <ChangeBadge value={h.pct30d} />
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <ChangeBadge value={h.pctYtd} />
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
