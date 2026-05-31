// Crypto holdings — prices from CoinGecko (no API key needed)
import type { CryptoHolding } from "./types";

export const cryptoHoldings: CryptoHolding[] = [
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin" },
  { id: "solana", symbol: "SOL", name: "Solana" },
  { id: "sui", symbol: "SUI", name: "Sui" },
  { id: "bittensor", symbol: "TAO", name: "Bittensor" },
];
