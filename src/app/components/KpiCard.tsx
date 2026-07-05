interface KpiCardProps {
  label: string;
  value: string | number;
  delta?: string;
  deltaType?: "up" | "down" | "neutral";
  icon: string;
}

export default function KpiCard({ label, value, delta, deltaType, icon }: KpiCardProps) {
  const deltaColor =
    deltaType === "up"
      ? "text-emerald-400"
      : deltaType === "down"
      ? "text-red-400"
      : "text-gray-500";

  return (
    <div className="rounded-xl border border-[#2a2d3e] bg-[#1a1d27] p-4 flex flex-col gap-2">
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <span>{icon}</span>
        <span>{label}</span>
      </div>
      <div className="text-2xl font-medium text-white">{value}</div>
      {delta && (
        <div className={`text-xs ${deltaColor}`}>{delta}</div>
      )}
    </div>
  );
}