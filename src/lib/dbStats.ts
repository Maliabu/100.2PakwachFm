import { createClient } from "redis";

const redis = createClient({ url: process.env.REDIS_URL });

let isConnected = false;

async function connectRedis() {
  if (!isConnected) {
    try {
      await redis.connect();
      isConnected = true;
    } catch (err) {
      console.error("❌ Redis connection failed:", err);
    }
  }
}

export const dbStats = {
  async increment(key: "activeConnections" | "totalQueries" | "queuedEvents") {
    await connectRedis();
    try {
      await redis.incr(`dbstats:${key}`);
    } catch (err) {
      console.error(`❌ Failed to increment ${key}:`, err);
    }
  },

  async decrement(key: "activeConnections") {
    await connectRedis();
    try {
      const val = await redis.decr(`dbstats:${key}`);
      if (val < 0) await redis.set(`dbstats:${key}`, "0");
    } catch (err) {
      console.error(`❌ Failed to decrement ${key}:`, err);
    }
  },

  async getAll() {
    await connectRedis();
    try {
      const results = (await redis.sendCommand([
        "MGET",
        "dbstats:activeConnections",
        "dbstats:totalQueries",
        "dbstats:queuedEvents"
      ])) as (string | null)[];
    
      const [active, total, queued] = results;
    
      return {
        activeConnections: Number(active) || 0,
        totalQueries: Number(total) || 0,
        queuedEvents: Number(queued) || 0,
      };
    } catch (err) {
      console.error("❌ Failed to getAll stats:", err);
      return {
        activeConnections: 0,
        totalQueries: 0,
        queuedEvents: 0,
      };
    }
  },

  async logHistory() {
    await connectRedis();
    try {
      const now = new Date().toISOString();
      const active = await redis.get("dbstats:activeConnections");
      await redis.lpush("dbstats:history", JSON.stringify({ time: now, active: Number(active) || 0 }));
      await redis.ltrim("dbstats:history", 0, 100);
    } catch (err) {
      console.error("❌ Failed to log history:", err);
    }
  },

  async getHistory() {
    await connectRedis();
    try {
      const raw = await redis.multi()
        .lRange("dbstats:history", 0, -1)
        .exec();

      if (!raw || !Array.isArray(raw[0])) return [];

      const history = raw[0] as string[];
      return history.map(item => JSON.parse(item));
    } catch (err) {
      console.error("❌ Failed to get history:", err);
      return [];
    }
  }
};
