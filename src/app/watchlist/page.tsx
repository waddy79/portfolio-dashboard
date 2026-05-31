import { watchlist } from "@/data/watchlist";
import { EnrichedHolding } from "@/data/types";
import PortfolioTable from "@/components/PortfolioTable";

async function getWatchlist(): Promise<EnrichedHolding[]> {
  const tickers = watchlist.map((h) => h.ticker).filter(Boolean);
  if (tickers.length === 0) return [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/prices?tickers=${tickers.join(",")}`,
      { next: { revalidate: 300 } }
    );
    const data = await res.json();
    const priceMap = new Map(data.map((p: { ticker: string }) => [p.ticker.toUpperCase(), p]));

    return watchlist.map((h) => {
      const p = priceMap.get(h.ticker.toUpperCase());
      return {
        ...h,
        currentPrice: (p as { price?: number })?.price ?? null,
        pctDay: (p as { pctDay?: number })?.pctDay ?? null,
        pct7d: (p as { pct7d?: number })?.pct7d ?? null,
        pct30d: (p as { pct30d?: number })?.pct30d ?? null,
        pctYtd: (p as { pctYtd?: number })?.pctYtd ?? null,
        pctAth: (p as { pctAth?: number })?.pctAth ?? null,
      };
    });
  } catch {
    return watchlist.map((h) => ({
      ...h,
      currentPrice: null,
      pctDay: null,
      pct7d: null,
      pct30d: null,
      pctYtd: null,
      pctAth: null,
    }));
  }
}

export default async function WatchlistPage() {
  const items = await getWatchlist();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Watchlist</h1>
        <p className="text-slate-400 text-sm mt-1">
          Tickers you&apos;re tracking but don&apos;t own yet &middot; Edit{" "}
          <code className="text-slate-300">src/data/watchlist.ts</code> to update
        </p>
      </div>
      <div className="bg-slate-800/30 rounded-xl p-6">
        <PortfolioTable holdings={items} loading={false} />
      </div>
    </div>
  );
}
