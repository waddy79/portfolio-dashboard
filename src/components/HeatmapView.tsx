"use client";

import { useRef, useEffect, useMemo, useState } from "react";
import { hierarchy, treemap, treemapSquarify } from "d3-hierarchy";
import { EnrichedHolding, Period } from "../data/types";

const MIN_TILE_VALUE = 0.5;

function getPeriodValue(h: EnrichedHolding, period: Period): number | null {
  switch (period) {
    case "return": return h.pctReturn;
    case "1d":     return h.pctDay;
    case "7d":     return h.pct7d;
    case "30d":    return h.pct30d;
    case "ytd":    return h.pctYtd;
  }
}

function getColor(pct: number | null): string {
  if (pct === null) return "#1e2433";
  if (pct >= 10)  return "#16c784";
  if (pct >= 2)   return "#1a9e68";
  if (pct >= 0)   return "#166a47";
  if (pct >= -2)  return "#7a1e22";
  if (pct >= -10) return "#b22222";
  return "#ea3943";
}

interface TileLeaf {
  x0: number; y0: number; x1: number; y1: number;
  data: EnrichedHolding;
}

export default function HeatmapView({
  holdings,
  loading,
  selectedPeriod,
}: {
  holdings: EnrichedHolding[];
  loading: boolean;
  selectedPeriod: Period;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ width: 0, height: 0 });
  const [tooltip, setTooltip] = useState<EnrichedHolding | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setDims({ width: r.width, height: r.height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const tiles = useMemo((): TileLeaf[] => {
    if (dims.width === 0 || dims.height === 0 || holdings.length === 0) return [];

    const root = hierarchy<{ children?: EnrichedHolding[] } | EnrichedHolding>(
      { children: holdings },
      (d) => ("children" in d ? (d as { children: EnrichedHolding[] }).children : null)
    ).sum((d) => {
      if ("children" in d) return 0;
      const h = d as EnrichedHolding;
      const v = getPeriodValue(h, selectedPeriod);
      return Math.abs(v ?? 0) || MIN_TILE_VALUE;
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (treemap() as any).tile(treemapSquarify).size([dims.width, dims.height]).padding(2)(root);

    return root.leaves().map((leaf) => ({
      x0: leaf.x0 ?? 0,
      y0: leaf.y0 ?? 0,
      x1: leaf.x1 ?? 0,
      y1: leaf.y1 ?? 0,
      data: leaf.data as EnrichedHolding,
    }));
  }, [holdings, dims, selectedPeriod]);

  return (
    <div style={{ position: "relative" }}>
      {/* Treemap container — fixed aspect ratio via padding trick */}
      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: "100%",
          height: "calc(100vh - 260px)",
          minHeight: "420px",
          background: "#0a0e1a",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {loading ? (
          <LoadingSkeleton />
        ) : (
          tiles.map((tile) => (
            <Tile
              key={tile.data.ticker}
              tile={tile}
              period={selectedPeriod}
              onEnter={setTooltip}
              onLeave={() => setTooltip(null)}
            />
          ))
        )}
      </div>

      {/* Tooltip */}
      {tooltip && (
        <TooltipCard holding={tooltip} />
      )}
    </div>
  );
}

function Tile({
  tile,
  period,
  onEnter,
  onLeave,
}: {
  tile: TileLeaf;
  period: Period;
  onEnter: (h: EnrichedHolding) => void;
  onLeave: () => void;
}) {
  const { data: h, x0, y0, x1, y1 } = tile;
  const w = x1 - x0;
  const ht = y1 - y0;
  const pct = getPeriodValue(h, period);
  const color = getColor(pct);

  const isLarge  = w > 130 && ht > 90;
  const isMedium = w > 80  && ht > 55;
  const isSmall  = w > 48  && ht > 34;

  const pad = isLarge ? 10 : isMedium ? 6 : 4;

  return (
    <div
      onMouseEnter={() => onEnter(h)}
      onMouseLeave={onLeave}
      style={{
        position: "absolute",
        left: x0,
        top: y0,
        width: w,
        height: ht,
        backgroundColor: color,
        overflow: "hidden",
        cursor: "pointer",
        boxSizing: "border-box",
        padding: pad,
        display: "flex",
        flexDirection: "column",
        transition: "filter 0.1s",
      }}
      onMouseOver={(e) => (e.currentTarget.style.filter = "brightness(1.15)")}
      onFocus={(e) => (e.currentTarget.style.filter = "brightness(1.15)")}
      onMouseOut={(e) => (e.currentTarget.style.filter = "none")}
      onBlur={(e) => (e.currentTarget.style.filter = "none")}
    >
      {isSmall && (
        <>
          {/* Top section: ticker + name */}
          <div
            style={{
              color: "#ffffff",
              fontWeight: 800,
              fontSize: isLarge ? 15 : isMedium ? 11 : 9,
              lineHeight: 1.1,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontFamily: "'Inter', system-ui, sans-serif",
              letterSpacing: isLarge ? "0.02em" : 0,
            }}
          >
            {h.ticker}
          </div>

          {isLarge && (
            <div
              style={{
                color: "rgba(255,255,255,0.45)",
                fontSize: 9,
                lineHeight: 1.2,
                marginTop: 2,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              {h.name.length > 18 ? h.name.slice(0, 17) + "…" : h.name}
            </div>
          )}

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Bottom: pct */}
          {pct !== null && (
            <div
              style={{
                color: "#ffffff",
                fontWeight: 700,
                fontSize: isLarge ? 14 : isMedium ? 10 : 8,
                lineHeight: 1,
                fontFamily: "'Inter', system-ui, sans-serif",
                whiteSpace: "nowrap",
              }}
            >
              {pct >= 0 ? "+" : ""}{pct.toFixed(1)}%
            </div>
          )}
        </>
      )}
    </div>
  );
}

function TooltipCard({ holding }: { holding: EnrichedHolding }) {
  const periods: { key: Period; label: string }[] = [
    { key: "return", label: "Your Return" },
    { key: "1d",     label: "1 Day" },
    { key: "7d",     label: "1 Week" },
    { key: "30d",    label: "1 Month" },
    { key: "ytd",    label: "YTD" },
  ];

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        background: "#111827",
        border: "1px solid #1e2433",
        borderRadius: 10,
        padding: "14px 18px",
        zIndex: 100,
        minWidth: 220,
        boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
        pointerEvents: "none",
      }}
    >
      <div style={{ color: "#ffffff", fontWeight: 800, fontSize: 18, fontFamily: "'Inter', sans-serif" }}>
        {holding.ticker}
      </div>
      <div style={{ color: "#94a3b8", fontSize: 11, marginBottom: 10, fontFamily: "'Inter', sans-serif" }}>
        {holding.name}{holding.sector ? ` · ${holding.sector}` : ""}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px 12px" }}>
        {periods.map(({ key, label }) => {
          const v = getPeriodValue(holding, key);
          return (
            <div key={key} style={{ fontFamily: "'Inter', sans-serif" }}>
              <span style={{ color: "#64748b", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {label}
              </span>
              <div
                style={{
                  color: v === null ? "#475569" : v >= 0 ? "#16c784" : "#ea3943",
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                {v !== null ? `${v >= 0 ? "+" : ""}${v.toFixed(2)}%` : "—"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  const boxes = Array.from({ length: 20 }, (_, i) => ({
    w: 60 + ((i * 37) % 140),
    h: 50 + ((i * 23) % 100),
  }));
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 2, padding: 2 }}>
      {boxes.map((b, i) => (
        <div
          key={i}
          style={{
            width: b.w,
            height: b.h,
            background: "#1e2433",
            borderRadius: 4,
            animation: "pulse 1.5s ease-in-out infinite",
            animationDelay: `${i * 0.05}s`,
          }}
        />
      ))}
      <style>{`@keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:0.8} }`}</style>
    </div>
  );
}
