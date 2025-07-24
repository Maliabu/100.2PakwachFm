import { createClient } from "redis";

const redis = createClient({
  url: process.env.REDIS_URL, 
});

await redis.connect();

export async function GET() {
  const keys = [
    "dbstats:activeConnections",
    "dbstats:totalQueries",
    "dbstats:queuedEvents",
  ];

  const results = await redis.mGet(keys);
  const [active, total, queued] = results;

  let history: { time: string; active: number }[] = [];

  try {
    const raw = await redis.lRange("dbstats:history", 0, -1);
    history = raw.map((item) => JSON.parse(item));
  } catch (err) {
    console.warn("Could not load history from Redis:", err);
  }

  return Response.json({
    activeConnections: Number(active) || 0,
    totalQueries: Number(total) || 0,
    queuedEvents: Number(queued) || 0,
    history,
    time: new Date().toISOString(),
    poolLimit: 8,
  });
}
