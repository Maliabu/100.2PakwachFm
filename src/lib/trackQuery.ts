// // lib/trackedQuery.ts
// import { db } from "@/db/db"; // Now db is fully defined here
// import { dbStats } from "@/lib/dbStats";

// export async function trackedQuery<T = unknown>(
//   queryFn: (db: typeof db) => Promise<T>
// ): Promise<T> {
//   await dbStats.increment("totalQueries");

//   try {
//     return await queryFn(db);
//   } catch (err) {
//     console.error("Query error:", err);
//     throw err;
//   }
// }
