// app/api/track/route.ts
import { db } from "@/db/db";
import { webUser, webEvents } from "@/db/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const { userId, event, metadata, timestamp } = await req.json();

    // Check if user exists
    const [existingUser] = await db
      .select()
      .from(webUser)
      .where(eq(webUser.id, userId));

    if (!existingUser) {
      // Insert user if doesn't exist
      await db.insert(webUser).values({
        id: userId,
        consent: "true",
        createdAt: new Date(timestamp),
        updatedAt: new Date(timestamp),
      });
    } else {
      // Update last_seen
      await db
        .update(webUser)
        .set({ updatedAt: new Date(timestamp) })
        .where(eq(webUser.id, userId));
    }

    // Insert event
    await db.insert(webEvents).values({
      id: uuidv4(),
      user_id: userId,
      event_type: event,
      metadata,
      createdAt: new Date(timestamp),
    });

    return new Response("Event stored", { status: 200 });
  } catch (err) {
    console.error("Tracking error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
