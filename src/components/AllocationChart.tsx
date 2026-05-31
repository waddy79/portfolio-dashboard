"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { EnrichedHolding } from "../data/types";

interface Props {
  holdings: EnrichedHolding[];
}

const COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#a855f7",
  "#d946ef",
  "#ec4899",
  "#f43f5e",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#14b8a6",
  "#06b6d4",
  "#3b82f6",
];

export default function AllocationChart({ holdings }: Props) {
  const data = holdings
    .filter((h) => h.currentPrice)
    .map((h) => ({
      name: h.ticker,
      value: h.shares * (h.currentPrice ?? 0),
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className="bg-gray-800/50 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Allocation</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "1px solid #374151",
                borderRadius: "8px",
              }}
              itemStyle={{ color: "#e5e7eb" }}
              formatter={((value: unknown, name: unknown) => [`${String(name)}`, ""]) as never}
            />
            <Legend
              wrapperStyle={{ color: "#9ca3af", fontSize: "12px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
