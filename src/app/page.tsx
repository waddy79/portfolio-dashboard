import { holdings } from "@/data/holdings";
import { EnrichedHolding } from "@/data/types";
import PortfolioTable from "@/components/PortfolioTable";
import AllocationChart from "@/components/AllocationChart";

async function getEnrichedHoldings(): Promise<EnrichedHolding[]> {
  if (holdings.length === 0) {
    return [];
  }

  const tickers = holdings.map((h) => h.ticker);
  const apiUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/prices?tickers=${tickers.join(",")}`;

  try {
    const res = await fetch(apiUrl, { next: { revalidate: 300 } }); // 5min cache
    const priceData = (await res.json()) as {
      ticker: string;
      price: number | null;
      pctDay: number | null;
      pct7d: number | null;
      pct30d: number | null;
      pctYtd: number | null;
      pctAth: number | null;
    }[];

    const priceMap = new Map(priceData.map((p) => [p.ticker.toUpperCase(), p]));

    return holdings.map((h) => {
      const p = priceMap.get(h.ticker.toUpperCase());
      return {
        ...h,
        currentPrice: p?.price ?? null,
        pctDay: p?.pctDay ?? null,
        pct7d: p?.pct7d ?? null,
        pct30d: p?.pct30d ?? null,
        pctYtd: p?.pctYtd ?? null,
        pctAth: p?.pctAth ?? null,
      };
    });
  } catch {
    return holdings.map((h) => ({
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

export default async function Home() {
  const enriched = await getEnrichedHoldings();

  // Summary stats
  const withPrice = enriched.filter((h) => h.currentPrice);
  const bestToday = [...withPrice].sort((a, b) => (b.pctDay ?? -999) - (a.pctDay ?? -999))[0];
  const worstToday = [...withPrice].sort((a, b) => (a.pctDay ?? 999) - (b.pctDay ?? 999))[0];
  const totalPositions = enriched.length;

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-5">
          <p className="text-sm text-slate-400">Positions</p>
          <p className="text-3xl font-bold text-white mt-1">{totalPositions}</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-5">
          <p className="text-sm text-slate-400">Best Today</p>
          <p className="text-lg font-bold text-emerald-400 mt-1">
            {bestToday ? `${bestToday.ticker} +${bestToday.pctDay?.toFixed(2)}%` : "—"}
          </p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-5">
          <p className="text-sm text-slate-400">Worst Today</p>
          <p className="text-lg font-bold text-red-400 mt-1">
            {worstToday ? `${worstToday.ticker} ${worstToday.pctDay?.toFixed(2)}%` : "—"}
          </p>
        </div>
      </div>

      {/* Allocation + Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <AllocationChart holdings={enriched} />
        </div>
        <div className="lg:col-span-2">
          <div className="bg-slate-800/30 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Holdings</h2>
            <PortfolioTable
              holdings={enriched}
              loading={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
