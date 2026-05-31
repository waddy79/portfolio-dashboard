import { cryptoHoldings } from "@/data/crypto";
import { EnrichedCryptoHolding } from "@/data/types";
import ChangeBadge from "@/components/ChangeBadge";

async function getEnrichedCrypto(): Promise<EnrichedCryptoHolding[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/crypto`,
      { next: { revalidate: 120 } }
    );
    const data = await res.json();
    return data as EnrichedCryptoHolding[];
  } catch {
    return [];
  }
}

export default async function CryptoPage() {
  const coins = await getEnrichedCrypto();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Crypto</h1>
        <p className="text-slate-400 text-sm mt-1">
          Live prices from CoinGecko
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {coins.map((coin) => {
          const holding = cryptoHoldings.find((h) => h.id === coin.id);
          if (!holding) return null;
          return (
            <div
              key={coin.id}
              className="bg-slate-800/50 rounded-xl p-5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {coin.symbol}
                  </h3>
                  <p className="text-sm text-slate-400">{coin.name}</p>
                </div>
                <span className="text-xl font-bold text-white">
                  ${coin.currentPrice?.toLocaleString() ?? "—"}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-xs text-slate-500">24h</p>
                  <ChangeBadge value={coin.pctDay} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">7d</p>
                  <ChangeBadge value={coin.pct7d} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">30d</p>
                  <ChangeBadge value={coin.pct30d} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
