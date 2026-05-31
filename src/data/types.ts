export interface Holding {
  ticker: string;
  name: string;
  isin?: string;
}

export interface EnrichedHolding extends Holding {
  currentPrice: number | null;
  pctDay: number | null;
  pct7d: number | null;
  pct30d: number | null;
  pctYtd: number | null;
  pctAth: number | null;
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
