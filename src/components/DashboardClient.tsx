"use client";

import { useState, useEffect } from "react";
import { holdings } from "@/data/holdings";
import { EnrichedHolding } from "@/data/types";
import SummaryBar from "./SummaryBar";
import HeatmapView from "./HeatmapView";
import TableView from "./TableView";

type View = "heatmap" | "table";

const INITIAL_HOLDINGS: EnrichedHolding[] = holdings.map((h) => ({
  ...h,
  currentPrice: null,
  pctDay: null,
  pct7d: null,
  pct30d: null,
  pctYtd: null,
  pctAth: null,
}));

export default function DashboardClient() {
  const [view, setView] = useState<View>("heatmap");
  const [enriched, setEnriched] = useState<EnrichedHolding[]>(INITIAL_HOLDINGS);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    // Build API ticker list using yahooTicker when available
    const apiTickers = holdings.map((h) => h.yahooTicker ?? h.ticker);

    fetch(`/api/prices?tickers=${apiTickers.join(",")}`)
      .then((r) => r.json())
      .then((data: { ticker: string; price: number | null; pctDay: number | null; pct7d: number | null; pct30d: number | null; pctYtd: number | null; pctAth: number | null }[]) => {
        // Index results by the API ticker (uppercase)
        const priceMap = new Map(
          data.map((d) => [d.ticker.toUpperCase(), d])
        );

        setEnriched(
          holdings.map((h) => {
            const apiTicker = (h.yahooTicker ?? h.ticker).toUpperCase();
            const p = priceMap.get(apiTicker);
            return {
              ...h,
              currentPrice: p?.price ?? null,
              pctDay: p?.pctDay ?? null,
              pct7d: p?.pct7d ?? null,
              pct30d: p?.pct30d ?? null,
              pctYtd: p?.pctYtd ?? null,
              pctAth: p?.pctAth ?? null,
            };
          })
        );
        setLastUpdated(new Date());
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-4">
      {/* Summary bar */}
      <SummaryBar holdings={enriched} loading={loading} lastUpdated={lastUpdated} />

      {/* View tabs */}
      <div className="flex items-center gap-4">
        <div className="flex bg-slate-800/60 rounded-lg p-0.5 gap-0.5">
          <button
            onClick={() => setView("heatmap")}
            className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
              view === "heatmap"
                ? "bg-slate-600 text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            🗺 Heatmap
          </button>
          <button
            onClick={() => setView("table")}
            className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
              view === "table"
                ? "bg-slate-600 text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            📊 Table
          </button>
        </div>

        {!loading && (
          <span className="text-slate-600 text-xs">
            {enriched.filter((h) => h.pctDay !== null).length} / {enriched.length} prices loaded
          </span>
        )}
      </div>

      {/* Views */}
      {view === "heatmap" ? (
        <HeatmapView holdings={enriched} loading={loading} />
      ) : (
        <TableView holdings={enriched} loading={loading} />
      )}
    </div>
  );
}
