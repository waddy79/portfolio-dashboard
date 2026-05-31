import { NextResponse } from "next/server";
import type { EnrichedCryptoHolding } from "../../../data/types";

const CG_BASE = "https://api.coingecko.com/api/v3";

async function fetchJSON(url: string) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function GET() {
  try {
    const ids = ["bitcoin", "solana", "sui", "bittensor"];

    // Fetch current prices + 24h change
    const priceData = await fetchJSON(
      `${CG_BASE}/simple/price?ids=${ids.join(",")}&vs_currencies=usd&include_24hr_change=true`
    );

    // Fetch market chart for each coin (for historical %)
    const chartPromises = ids.map((id) =>
      fetchJSON(`${CG_BASE}/coins/${id}/market_chart?vs_currency=usd&days=365`).catch(() => null)
    );
    const charts = await Promise.all(chartPromises);

    const results: EnrichedCryptoHolding[] = ids.map((id, i) => {
      const info = priceData[id];
      const chart = charts[i];
      const prices = chart?.prices as [number, number][] | undefined;

      const currentPrice = info?.usd ?? null;
      const pctDay = info?.usd_24h_change ?? null;

      let pct7d: number | null = null;
      let pct30d: number | null = null;
      let pctYtd: number | null = null;
      let pctAth: number | null = null;

      if (prices && prices.length > 0 && currentPrice) {
        // 7d ago
        const d7 = prices.find(([ts]) => ts >= Date.now() - 7 * 86400000);
        if (d7) pct7d = ((currentPrice - d7[1]) / d7[1]) * 100;

        // 30d ago
        const d30 = prices.find(([ts]) => ts >= Date.now() - 30 * 86400000);
        if (d30) pct30d = ((currentPrice - d30[1]) / d30[1]) * 100;

        // YTD
        const ytdStart = new Date(new Date().getFullYear(), 0, 1).getTime();
        const ytd = prices.find(([ts]) => ts >= ytdStart);
        if (ytd) pctYtd = ((currentPrice - ytd[1]) / ytd[1]) * 100;

        // All-time (oldest point)
        if (prices[0]) pctAth = ((currentPrice - prices[0][1]) / prices[0][1]) * 100;
      }

      const symbols: Record<string, { symbol: string; name: string }> = {
        bitcoin: { symbol: "BTC", name: "Bitcoin" },
        solana: { symbol: "SOL", name: "Solana" },
        sui: { symbol: "SUI", name: "Sui" },
        bittensor: { symbol: "TAO", name: "Bittensor" },
      };

      return {
        id,
        symbol: symbols[id].symbol,
        name: symbols[id].name,
        currentPrice,
        pctDay,
        pct7d,
        pct30d,
        pctYtd,
        pctAth,
      };
    });

    return NextResponse.json(results);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
