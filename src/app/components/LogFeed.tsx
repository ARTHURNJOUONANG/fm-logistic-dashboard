import { LogEntry } from "@/hooks/useMetrics";

interface LogFeedProps {
  logs: LogEntry[];
}

const typeStyles = {
  ok: "bg-emerald-950 text-emerald-400 border-emerald-900",
  warn: "bg-yellow-950 text-yellow-400 border-yellow-900",
  error: "bg-red-950 text-red-400 border-red-900",
};

export default function LogFeed({ logs }: LogFeedProps) {
  return (
    <div className="rounded-xl border border-[#2a2d3e] bg-[#1a1d27] p-4 flex flex-col gap-3">
      <div className="text-xs font-medium text-gray-500 flex items-center gap-2">
        <span>⬡</span> Logs récents
      </div>
      <div className="flex flex-col gap-2 overflow-y-auto max-h-48">
        {logs.map((log) => (
          <div
            key={log.id}
            className={`flex items-start gap-2 text-xs p-2 rounded-lg border ${typeStyles[log.type]}`}
          >
            <span className="font-mono opacity-60 whitespace-nowrap">{log.time}</span>
            <span className="flex-1">{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}