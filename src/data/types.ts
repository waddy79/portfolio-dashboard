export interface Holding {
  ticker: string;       // Display ticker (e.g. "RR", "BT/A")
  yahooTicker?: string; // Yahoo Finance symbol when different (e.g. "RR.L", "BT-A.L")
  name: string;
  sector?: string;
  isin?: string;
  avgBuyPrice?: number; // Weighted avg cost basis in native price currency (not displayed, used for return %)
}

export interface EnrichedHolding extends Holding {
  currentPrice: number | null;
  pctDay: number | null;
  pct7d: number | null;
  pct30d: number | null;
  pctYtd: number | null;
  pctAth: number | null;
  pctReturn: number | null; // Personal return: (currentPrice - avgBuyPrice) / avgBuyPrice * 100
}

export interface CryptoHolding {
  id: string;
  symbol: string;
  name: string;
}

export interface EnrichedCryptoHolding extends CryptoHolding {
  currentPrice: number | null;
  pctDay: number | null;
  pct7d: number | null;
  pct30d: number | null;
  pctYtd: number | null;
  pctAth: number | null;
}

export type Period = 'return' | '1d' | '7d' | '30d' | 'ytd';

export interface StockPriceData {
  ticker: string;
  price: number | null;
  closes: { [date: string]: number };
  currency: string;
}

export interface EnrichedPriceData {
  ticker: string;
  price: number | null;
  pctDay: number | null;
  pct7d: number | null;
  pct30d: number | null;
  pctYtd: number | null;
  pctAth: number | null;
  currency: string;
}
