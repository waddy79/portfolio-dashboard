import { NextRequest, NextResponse } from "next/server";
import type { EnrichedPriceData, StockPriceData } from "../../../data/types";

async function fetchYahooData(
  ticker: string,
  range: string = "1y"
): Promise<StockPriceData | null> {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?range=${range}&interval=1d`;

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    if (!res.ok) return null;

    const json = await res.json();
    const result = json.chart?.result?.[0];
    if (!result) return null;

    const closes: Record<string, number> = {};
    const timestamps: number[] = result.timestamp || [];
    const quoteCloses: (number | null)[] =
      result.indicators?.quote?.[0]?.close || [];

    timestamps.forEach((ts, i) => {
      const date = new Date(ts * 1000).toISOString().split("T")[0];
      if (quoteCloses[i] !== null) {
        closes[date] = quoteCloses[i] as number;
      }
    });

    return {
      ticker,
      price: result.meta?.regularMarketPrice ?? null,
      closes,
      currency: result.meta?.currency ?? "USD",
    };
  } catch {
    return null;
  }
}

function pctChange(current: number, past: number): number {
  return ((current - past) / past) * 100;
}

export async function GET(req: NextRequest) {
  const tickers = req.nextUrl.searchParams.get("tickers")?.split(",") || [];

  if (tickers.length === 0) {
    return NextResponse.json({ error: "No tickers provided" }, { status: 400 });
  }

  const seen = new Set<string>();
  const unique: string[] = [];
  for (const t of tickers) {
    const trimmed = t.trim().toUpperCase();
    if (trimmed && !seen.has(trimmed)) {
      seen.add(trimmed);
      unique.push(trimmed);
    }
  }
  unique.splice(200);

  const results: EnrichedPriceData[] = await Promise.all(
    unique.map(async (ticker): Promise<EnrichedPriceData> => {
      const data = await fetchYahooData(ticker);

      if (!data || !data.price) {
        return {
          ticker,
          price: null,
          pctDay: null,
          pct7d: null,
          pct30d: null,
          pctYtd: null,
          pctAth: null,
          currency: "USD",
        };
      }

      const closes = data.closes;
      const dates = Object.keys(closes).sort();
      const sortedDesc = dates.slice().reverse();
      const current = data.price;

      const prevDay = sortedDesc[1] ?? null;
      const pctDay = prevDay ? pctChange(current, closes[prevDay]) : null;

      const d7 = sortedDesc[7] ?? null;
      const pct7d = d7 ? pctChange(current, closes[d7]) : null;

      const d30 = sortedDesc[30] ?? null;
      const pct30d = d30 ? pctChange(current, closes[d30]) : null;

      const now = new Date();
      const currentYear = now.getFullYear();
      let pctYtd: number | null = null;
      for (const d of dates) {
        const dt = new Date(d);
        if (dt.getFullYear() === currentYear) {
          pctYtd = pctChange(current, closes[d]);
          break;
        }
      }

      const oldest = dates[0];
      const pctAth = oldest ? pctChange(current, closes[oldest]) : null;

      return {
        ticker,
        price: current,
        pctDay,
        pct7d,
        pct30d,
        pctYtd,
        pctAth,
        currency: data.currency,
      };
    })
  );

  return NextResponse.json(results);
}
