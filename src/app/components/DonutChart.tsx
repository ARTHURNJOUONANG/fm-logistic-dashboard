"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "2xx", value: 92, color: "#1baf7a" },
  { name: "4xx", value: 5, color: "#eda100" },
  { name: "5xx", value: 3, color: "#e34948" },
];

export default function DonutChart() {
  return (
    <div className="rounded-xl border border-[#2a2d3e] bg-[#1a1d27] p-4 flex flex-col gap-3">
      <div className="text-xs font-medium text-gray-500 flex items-center gap-2">
        <span>⬡</span> Codes HTTP
      </div>
      <div className="flex items-center gap-4">
        <div className="w-32 h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={55}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#1a1d27",
                  border: "1px solid #2a2d3e",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "#fff",
                }}
                formatter={(value) => [`${value}%`, ""]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-2">
          {data.map((d) => (
            <div key={d.name} className="flex items-center gap-2 text-xs">
              <div
                className="w-2 h-2 rounded-sm"
                style={{ background: d.color }}
              />
              <span className="text-gray-400">{d.name}</span>
              <span className="text-white font-medium">{d.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}