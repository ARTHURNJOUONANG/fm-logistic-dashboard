import { WebSocketServer } from "ws";

console.log("Démarrage du serveur WebSocket...");

const wss = new WebSocketServer({ port: 8080 });

console.log("✅ WebSocket server running on ws://localhost:8080");

const ENDPOINTS = [
  { path: "/api/orders", rpm: 42, latency: 38, status: "ok" },
  { path: "/api/tracking", rpm: 31, latency: 51, status: "ok" },
  { path: "/api/warehouse", rpm: 18, latency: 122, status: "warn" },
  { path: "/api/auth", rpm: 12, latency: 29, status: "ok" },
  { path: "/api/reports", rpm: 7, latency: 340, status: "warn" },
];

const LOG_MESSAGES = [
  { type: "error", message: "[500] /api/warehouse — timeout après 5000ms" },
  { type: "ok", message: "[200] /api/orders — 38ms — 142 commandes" },
  { type: "warn", message: "[429] /api/reports — rate limit atteint" },
  { type: "ok", message: "[200] /api/tracking — 51ms" },
  { type: "error", message: "[503] /api/auth — service indisponible" },
];

const endpoints = ENDPOINTS.map(e => ({ ...e }));
let logIdx = 0;

const broadcast = (data) => {
  const msg = JSON.stringify(data);
  wss.clients.forEach(client => {
    if (client.readyState === 1) client.send(msg);
  });
};

setInterval(() => {
  const metric = {
    rpm: Math.floor(95 + Math.random() * 30),
    latency: Math.floor(45 + Math.random() * 30),
    errorRate: parseFloat((1 + Math.random() * 3).toFixed(1)),
    uptime: 99.97,
  };

  endpoints.forEach(e => {
    e.rpm = Math.max(1, e.rpm + Math.floor(Math.random() * 3 - 1));
    e.latency = Math.max(10, e.latency + Math.floor(Math.random() * 10 - 5));
    e.status = e.latency > 300 ? "error" : e.latency > 100 ? "warn" : "ok";
  });

  broadcast({ type: "metric", data: metric });
  broadcast({ type: "endpoints", data: endpoints });
  console.log(`📊 Broadcast — RPM: ${metric.rpm} | Latency: ${metric.latency}ms`);
}, 2000);

setInterval(() => {
  const log = LOG_MESSAGES[logIdx % LOG_MESSAGES.length];
  logIdx++;
  broadcast({ type: "log", data: { ...log, id: Date.now(), time: new Date().toLocaleTimeString("fr-FR") } });
}, 3500);

wss.on("connection", (ws) => {
  console.log("🔌 Client connecté !");
  ws.on("close", () => console.log("❌ Client déconnecté"));
});