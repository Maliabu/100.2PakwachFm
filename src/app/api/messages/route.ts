import { db } from "@/db/db";
import { messagesTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

// This will handle the GET request to /api/users
export async function GET() {
  try {
    // Query the database
    const messages = await db.select().from(messagesTable).orderBy(desc(messagesTable.createdAt));
    
    // Return the users as a JSON response
    return NextResponse.json(messages);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}