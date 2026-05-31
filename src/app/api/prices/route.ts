import { NextRequest, NextResponse } from "next/server";
import type { EnrichedPriceData, StockPriceData } from "../../../data/types";

const YF_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "application/json, text/plain, */*",
  "Accept-Language": "en-US,en;q=0.9",
  Origin: "https://finance.yahoo.com",
  Referer: "https://finance.yahoo.com/",
};

async function fetchYahooData(
  ticker: string,
  range = "1y"
): Promise<StockPriceData | null> {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?range=${range}&interval=1d`;

  try {
    const res = await fetch(url, {
      headers: YF_HEADERS,
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      // Try query2 as fallback
      const url2 = url.replace("query1", "query2");
      const res2 = await fetch(url2, {
        headers: YF_HEADERS,
        signal: AbortSignal.timeout(8000),
      });
      if (!res2.ok) return null;
      const json2 = await res2.json();
      return parseYahooResponse(ticker, json2);
    }

    const json = await res.json();
    return parseYahooResponse(ticker, json);
  } catch {
    return null;
  }
}

function parseYahooResponse(ticker: string, json: unknown): StockPriceData | null {
  const result = (json as { chart?: { result?: unknown[] } }).chart?.result?.[0] as {
    timestamp?: number[];
    meta?: { regularMarketPrice?: number; currency?: string };
    indicators?: { quote?: { close?: (number | null)[] }[] };
  } | undefined;

  if (!result) return null;

  const closes: Record<string, number> = {};
  const timestamps: number[] = result.timestamp || [];
  const quoteCloses: (number | null)[] =
    result.indicators?.quote?.[0]?.close || [];

  timestamps.forEach((ts, i) => {
    const date = new Date(ts * 1000).toISOString().split("T")[0];
    if (quoteCloses[i] != null) {
      closes[date] = quoteCloses[i] as number;
    }
  });

  return {
    ticker,
    price: result.meta?.regularMarketPrice ?? null,
    closes,
    currency: result.meta?.currency ?? "USD",
  };
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

      const currentYear = new Date().getFullYear();
      let pctYtd: number | null = null;
      for (const d of dates) {
        if (new Date(d).getFullYear() === currentYear) {
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
