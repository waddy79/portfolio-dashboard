"use client";

import { useState, useEffect } from "react";
import { holdings } from "@/data/holdings";
import { EnrichedHolding, Period } from "@/data/types";
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
  pctReturn: null,
}));

export default function DashboardClient() {
  const [view, setView] = useState<View>("heatmap");
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("return");
  const [enriched, setEnriched] = useState<EnrichedHolding[]>(INITIAL_HOLDINGS);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    const apiTickers = holdings.map((h) => h.yahooTicker ?? h.ticker);

    fetch(`/api/prices?tickers=${apiTickers.join(",")}`)
      .then((r) => r.json())
      .then(
        (
          data: {
            ticker: string;
            price: number | null;
            pctDay: number | null;
            pct7d: number | null;
            pct30d: number | null;
            pctYtd: number | null;
            pctAth: number | null;
          }[]
        ) => {
          const priceMap = new Map(data.map((d) => [d.ticker.toUpperCase(), d]));

          setEnriched(
            holdings.map((h) => {
              const apiTicker = (h.yahooTicker ?? h.ticker).toUpperCase();
              const p = priceMap.get(apiTicker);
              const currentPrice = p?.price ?? null;
              const pctReturn =
                currentPrice !== null && h.avgBuyPrice != null && h.avgBuyPrice > 0
                  ? ((currentPrice - h.avgBuyPrice) / h.avgBuyPrice) * 100
                  : null;
              return {
                ...h,
                currentPrice,
                pctDay: p?.pctDay ?? null,
                pct7d: p?.pct7d ?? null,
                pct30d: p?.pct30d ?? null,
                pctYtd: p?.pctYtd ?? null,
                pctAth: p?.pctAth ?? null,
                pctReturn,
              };
            })
          );
          setLastUpdated(new Date());
          setLoading(false);
        }
      )
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={{ background: "#0a0e1a", minHeight: "100vh" }}>
      {/* Summary bar with period selector */}
      <SummaryBar
        holdings={enriched}
        loading={loading}
        lastUpdated={lastUpdated}
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
      />

      {/* View toggle */}
      <div style={{ display: "flex", gap: 4, marginTop: 16, marginBottom: 12 }}>
        {(["heatmap", "table"] as View[]).map((v) => {
          const active = view === v;
          const label = v === "heatmap" ? "HEATMAP" : "LIST VIEW";
          return (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                background: active ? "#1e2433" : "transparent",
                color: active ? "#ffffff" : "#475569",
                border: "1px solid",
                borderColor: active ? "#334155" : "#1e2433",
                borderRadius: 6,
                padding: "6px 16px",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.07em",
                cursor: "pointer",
                fontFamily: "'Inter', system-ui, sans-serif",
                transition: "all 0.15s",
              }}
            >
              {label}
            </button>
          );
        })}

        {!loading && (
          <span
            style={{
              color: "#334155",
              fontSize: 11,
              alignSelf: "center",
              marginLeft: 8,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {enriched.filter((h) => h.pctDay !== null).length} / {enriched.length} prices loaded
          </span>
        )}
      </div>

      {/* Active view */}
      {view === "heatmap" ? (
        <HeatmapView
          holdings={enriched}
          loading={loading}
          selectedPeriod={selectedPeriod}
        />
      ) : (
        <TableView holdings={enriched} loading={loading} />
      )}
    </div>
  );
}
