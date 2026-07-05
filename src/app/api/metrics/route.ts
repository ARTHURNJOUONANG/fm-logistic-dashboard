import { NextResponse } from "next/server";
import { insertMetric, insertEndpoint, insertLog, getRecentMetrics, getRecentLogs, getRecentEndpoints } from "@/lib/db";

export async function GET() {
  const metrics = getRecentMetrics();
  const logs = getRecentLogs();
  const endpoints = getRecentEndpoints();
  return NextResponse.json({ metrics, logs, endpoints });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { type, data } = body;

  if (type === "metric") {
    insertMetric(data);
  } else if (type === "endpoint") {
    insertEndpoint(data);
  } else if (type === "log") {
    insertLog(data);
  }

  return NextResponse.json({ success: true });
}