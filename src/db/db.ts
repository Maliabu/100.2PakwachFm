/* eslint-disable @typescript-eslint/no-explicit-any */
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";
import { dbStats } from "@/lib/dbStats";

if (!process.env.DATABASE_URL) {
    throw new Error('Missing DATABASE_URL');
}

// Singleton function to ensure only one db instance is created
function singleton<Value>(name: string, value: () => Value): Value {
    const globalAny: any = global;
    globalAny.__singletons = globalAny.__singletons || {};
    
    if (!globalAny.__singletons[name]) {
      globalAny.__singletons[name] = value();
    }
    
    return globalAny.__singletons[name];
}

// Function to create the database connection and apply migrations if needed
function createDatabaseConnection() {
    const pool = mysql.createPool(
      {
        uri:process.env.DATABASE_URL!,
        connectionLimit: 8
    });

    const originalQuery = pool.query.bind(pool) as (...args: any[]) => Promise<any>;
    
    pool.query = async (...args: any[]) => {
      await dbStats.increment("totalQueries");
      await dbStats.increment("activeConnections");
    
      try {
        return await originalQuery(...args);
      } finally {
        await dbStats.decrement("activeConnections");
      }
    };
    pool.on("enqueue", async () => {
      await dbStats.increment("queuedEvents");
    });
    
    return drizzle(pool, {
      schema,
      mode: 'default'
    });
}

const db = singleton('db', createDatabaseConnection);

export { db, schema };