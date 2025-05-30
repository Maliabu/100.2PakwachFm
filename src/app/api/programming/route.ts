import { db } from "@/db/db";
import { NextResponse } from "next/server";

// This will handle the GET request to /api/packaging
export async function GET() {
  try {
    // Query the database
    const programmes = await db.query.programmingTable.findMany({});
    
    // Return the users as a JSON response
    return NextResponse.json(programmes);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch programmes" }, { status: 500 });
  }
}