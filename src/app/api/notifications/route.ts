import { db } from "@/db/db";
import { notificationsTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

// This will handle the GET request to /api/users
export async function GET() {
  try {
    // Query the database
    const notifications = await db.select().from(notificationsTable).orderBy(desc(notificationsTable.createdAt));
    
    // Return the users as a JSON response
    return NextResponse.json(notifications);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 });
  }
}