"use client";

import { EnrichedHolding } from "../data/types";
import ChangeBadge from "./ChangeBadge";

interface Props {
  holdings: EnrichedHolding[];
  loading: boolean;
}

export default function PortfolioTable({ holdings, loading }: Props) {
  if (loading) {
    return (
      <div className="animate-pulse space-y-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-12 bg-gray-800 rounded-lg" />
        ))}
      </div>
    );
  }

  if (holdings.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-lg">No holdings yet.</p>
        <p className="text-sm mt-1">
          Send your Trading212 CSV export and I&apos;ll populate this.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-400 border-b border-gray-700">
            <th className="text-left py-3 px-2 font-medium">Ticker</th>
            <th className="text-left py-3 px-2 font-medium">Name</th>
            <th className="text-right py-3 px-2 font-medium">% Day</th>
            <th className="text-right py-3 px-2 font-medium">% 7d</th>
            <th className="text-right py-3 px-2 font-medium">% 30d</th>
            <th className="text-right py-3 px-2 font-medium">% YTD</th>
            <th className="text-right py-3 px-2 font-medium">% ATH</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((h) => (
            <tr
              key={h.ticker}
              className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
            >
              <td className="py-3 px-2 font-mono font-bold text-white">
                {h.ticker}
              </td>
              <td className="py-3 px-2 text-gray-300 max-w-[200px] truncate">
                {h.name}
              </td>
              <td className="py-3 px-2 text-right">
                <ChangeBadge value={h.pctDay} />
              </td>
              <td className="py-3 px-2 text-right">
                <ChangeBadge value={h.pct7d} />
              </td>
              <td className="py-3 px-2 text-right">
                <ChangeBadge value={h.pct30d} />
              </td>
              <td className="py-3 px-2 text-right">
                <ChangeBadge value={h.pctYtd} />
              </td>
              <td className="py-3 px-2 text-right">
                <ChangeBadge value={h.pctAth} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
