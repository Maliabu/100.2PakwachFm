import { db } from "@/db/db";
import { ticketingTable, usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// This will handle the GET request to /api/users
export async function GET() {
  try {
    // Query the database
    const tickets = await db.select().from(ticketingTable).leftJoin(usersTable, eq(ticketingTable.opened, usersTable.id));
    
    // Return the users as a JSON response
    return NextResponse.json(tickets);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch tickets" }, { status: 500 });
  }
}