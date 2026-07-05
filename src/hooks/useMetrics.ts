"use client";
import { useState, useEffect } from "react";

export interface Metric {
  rpm: number;
  latency: number;
  errorRate: number;
  uptime: number;
}

export interface DataPoint {
  time: string;
  requests: number;
  errors: number;
}

export interface Endpoint {
  path: string;
  rpm: number;
  latency: number;
  status: "ok" | "warn" | "error";
}

export interface LogEntry {
  id: number;
  type: "ok" | "warn" | "error";
  message: string;
  time: string;
}

const INITIAL_METRICS: Metric = { rpm: 112, latency: 58, errorRate: 1.8, uptime: 99.97 };
const INITIAL_ENDPOINTS: Endpoint[] = [
  { path: "/api/orders", rpm: 42, latency: 38, status: "ok" },
  { path: "/api/tracking", rpm: 31, latency: 51, status: "ok" },
  { path: "/api/warehouse", rpm: 18, latency: 122, status: "warn" },
  { path: "/api/auth", rpm: 12, latency: 29, status: "ok" },
  { path: "/api/reports", rpm: 7, latency: 340, status: "warn" },
];

export function useMetrics() {
  const [mounted, setMounted] = useState(false);
  const [metrics, setMetrics] = useState<Metric>(INITIAL_METRICS);
  const [history, setHistory] = useState<DataPoint[]>([]);
  const [endpoints, setEndpoints] = useState<Endpoint[]>(INITIAL_ENDPOINTS);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    setMounted(true);

    fetch("/api/ws").catch(console.error);

    const initial = Array.from({ length: 10 }, (_, i) => ({
      time: `${i}:00`,
      requests: Math.floor(80 + Math.random() * 60),
      errors: Math.floor(Math.random() * 8),
    }));
    setHistory(initial);

    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log("WebSocket connected");
      setConnected(true);
    };

    ws.onmessage = (event) => {
      const { type, data } = JSON.parse(event.data);

      if (type === "metric") {
        setMetrics(data);
        setHistory((prev) => {
          const time = new Date().toLocaleTimeString("fr-FR");
          return [...prev.slice(-11), { time, requests: data.rpm, errors: Math.floor(data.errorRate * 2) }];
        });
      }

      if (type === "endpoints") {
        setEndpoints(data);
      }

      if (type === "log") {
        setLogs((prev) => [data, ...prev.slice(0, 7)]);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
      setConnected(false);
    };

    return () => ws.close();
  }, []);

  if (!mounted) {
    return { metrics: INITIAL_METRICS, history: [], endpoints: INITIAL_ENDPOINTS, logs: [], connected: false };
  }

  return { metrics, history, endpoints, logs, connected };
}