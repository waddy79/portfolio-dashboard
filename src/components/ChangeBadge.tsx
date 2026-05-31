interface ChangeBadgeProps {
  value: number | null;
  suffix?: string;
}

export default function ChangeBadge({ value, suffix = "%" }: ChangeBadgeProps) {
  if (value === null || !isFinite(value)) {
    return <span className="text-gray-500 text-sm">N/A</span>;
  }

  const color =
    value > 0 ? "text-emerald-400" : value < 0 ? "text-red-400" : "text-gray-400";
  const sign = value > 0 ? "+" : "";

  return (
    <span className={`text-sm font-mono font-semibold ${color}`}>
      {sign}
      {value.toFixed(2)}
      {suffix}
    </span>
  );
}
