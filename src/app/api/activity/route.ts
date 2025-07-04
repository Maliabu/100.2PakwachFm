import { db } from "@/db/db";
import { activityTable, ticketingTable, usersTable } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// This will handle the GET request to /api/packaging
export async function GET() {
  try {
    // Query the database
    const activities = await db.select().from(activityTable).leftJoin(usersTable, eq(activityTable.user, usersTable.id)).leftJoin(ticketingTable, eq(activityTable.user, ticketingTable.opened))
    .orderBy(desc(activityTable.createdAt));
    
    // Return the users as a JSON response
    return NextResponse.json(activities);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch activities" }, { status: 500 });
  }
}