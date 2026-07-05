"use client";
import { useMetrics } from "@/hooks/useMetrics";
import KpiCard from "./components/KpiCard";
import RequestChart from "./components/RequestChart";
import DonutChart from "./components/DonutChart";
import EndpointTable from "./components/EndpointTable";
import LogFeed from "./components/LogFeed";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { metrics, history, endpoints, logs } = useMetrics();
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const tick = () => {
      const now = new Date();
      setTime(
        `${String(now.getHours()).padStart(2, "0")}:${String(
          now.getMinutes()
        ).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`
      );
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return (
    <main className="min-h-screen bg-[#0f1117] flex items-center justify-center">
      <div className="text-gray-500 text-sm font-mono animate-pulse">
        Chargement du dashboard...
      </div>
    </main>
  );

  return (
    <main className="min-h-screen bg-[#0f1117] p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="text-lg font-medium text-white">
            <span className="text-[#2a78d6]">FM</span> Logistic
            <span className="text-gray-500 font-normal ml-2">
               Monitoring
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950 border border-emerald-900 rounded-full px-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </div>
        </div>
        <div className="text-xs text-gray-500 font-mono">{time}</div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <KpiCard
          icon="⚡"
          label="Requêtes / min"
          value={metrics.rpm}
          delta="↑ Actif"
          deltaType="up"
        />
        <KpiCard
          icon="⏱"
          label="Latence moy."
          value={`${metrics.latency} ms`}
          delta={metrics.latency > 70 ? "↑ En hausse" : "↓ Stable"}
          deltaType={metrics.latency > 70 ? "down" : "up"}
        />
        <KpiCard
          icon="⚠"
          label="Taux d'erreur"
          value={`${metrics.errorRate}%`}
          delta={metrics.errorRate > 2.5 ? "↑ En hausse" : "↓ Stable"}
          deltaType={metrics.errorRate > 2.5 ? "down" : "up"}
        />
        <KpiCard
          icon="🟢"
          label="Uptime"
          value={`${metrics.uptime}%`}
          delta="Stable"
          deltaType="neutral"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div className="md:col-span-2">
          <RequestChart data={history} />
        </div>
        <DonutChart />
      </div>

      {/* Bottom */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <EndpointTable endpoints={endpoints} />
        <LogFeed logs={logs} />
      </div>

      {/* Footer */}
      <div className="mt-6 text-center text-xs text-gray-600">
        FM Logistic · · Monitoring Dashboard · Développé par Arthur Njouonang
      </div>

    </main>
  );
}