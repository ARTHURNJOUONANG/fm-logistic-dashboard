"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { DataPoint } from "@/hooks/useMetrics";

interface RequestChartProps {
  data: DataPoint[];
}

export default function RequestChart({ data }: RequestChartProps) {
  return (
    <div className="rounded-xl border border-[#2a2d3e] bg-[#1a1d27] p-4 flex flex-col gap-3">
      <div className="text-xs font-medium text-gray-500 flex items-center gap-2">
        <span>⬡</span> Flux de requêtes — temps réel
      </div>
      <div className="flex gap-4 mb-1">
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <div className="w-3 h-0.5 rounded bg-[#2a78d6]" />
          Requêtes
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <div className="w-3 h-0.5 rounded bg-[#e34948]" />
          Erreurs
        </div>
      </div>
      <div style={{ height: 180 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid stroke="#2a2d3e" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="time"
              tick={{ fill: "#555870", fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fill: "#555870", fontSize: 10 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "#1a1d27",
                border: "1px solid #2a2d3e",
                borderRadius: "8px",
                fontSize: "12px",
                color: "#fff",
              }}
            />
            <Line
              type="monotone"
              dataKey="requests"
              stroke="#2a78d6"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "#2a78d6" }}
            />
            <Line
              type="monotone"
              dataKey="errors"
              stroke="#e34948"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "#e34948" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}