// Crypto holdings — update amounts to match your actual positions
// Prices from CoinGecko (no API key needed)
import type { CryptoHolding } from "./types";

// ⚠️ UPDATE THESE to your actual holdings (e.g. 0.5 BTC, 10 SOL, etc.)
export const cryptoHoldings: CryptoHolding[] = [
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin", amount: 0 },
  { id: "solana", symbol: "SOL", name: "Solana", amount: 0 },
  { id: "sui", symbol: "SUI", name: "Sui", amount: 0 },
  { id: "bittensor", symbol: "TAO", name: "Bittensor", amount: 0 },
];
