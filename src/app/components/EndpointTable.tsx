import { Endpoint } from "@/hooks/useMetrics";

interface EndpointTableProps {
  endpoints: Endpoint[];
}

const statusStyles = {
  ok: "text-emerald-400",
  warn: "text-yellow-400",
  error: "text-red-400",
};

const statusLabel = {
  ok: "OK",
  warn: "Lent",
  error: "Erreur",
};

export default function EndpointTable({ endpoints }: EndpointTableProps) {
  return (
    <div className="rounded-xl border border-[#2a2d3e] bg-[#1a1d27] p-4 flex flex-col gap-3">
      <div className="text-xs font-medium text-gray-500 flex items-center gap-2">
        <span>⬡</span> Endpoints les plus actifs
      </div>
      <table className="w-full text-xs">
        <thead>
          <tr className="text-gray-600 border-b border-[#2a2d3e]">
            <th className="text-left py-2 font-normal">Endpoint</th>
            <th className="text-left py-2 font-normal">Req/min</th>
            <th className="text-left py-2 font-normal">Latence</th>
            <th className="text-left py-2 font-normal">Statut</th>
          </tr>
        </thead>
        <tbody>
          {endpoints.map((e) => (
            <tr
              key={e.path}
              className="border-b border-[#2a2d3e] last:border-0"
            >
              <td className="py-2 font-mono text-gray-300">{e.path}</td>
              <td className="py-2 text-gray-400">{e.rpm}</td>
              <td className="py-2 text-gray-400">{e.latency} ms</td>
              <td className={`py-2 font-medium ${statusStyles[e.status]}`}>
                {statusLabel[e.status]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}