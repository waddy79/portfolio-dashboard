// Watchlist — tickers you don't own but want to track
// Same format as holdings, price-only (no shares/avg price displayed)
import type { Holding } from "./types";

export const watchlist: Holding[] = [
  { ticker: "AAPL", name: "Apple", shares: 0, avgBuyPrice: 0, currency: "USD" },
  { ticker: "MSFT", name: "Microsoft", shares: 0, avgBuyPrice: 0, currency: "USD" },
  { ticker: "SMCI", name: "Super Micro Computer", shares: 0, avgBuyPrice: 0, currency: "USD" },
  { ticker: "TAO", name: "Bittensor", shares: 0, avgBuyPrice: 0, currency: "USD" },
];
