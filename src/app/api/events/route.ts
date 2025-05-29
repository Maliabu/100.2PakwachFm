/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "@/db/db";
import { NextResponse } from "next/server";

// This will handle the GET request to /api/packaging
export async function GET() {
  try {
    // Query the database
    const events = await db.query.EventsTable.findMany();
    
    // Return the events as a JSON response
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}