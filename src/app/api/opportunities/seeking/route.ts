import { db } from "@/db/db";
import { opportunitiesTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// This will handle the GET request to /api/users
export async function GET() {
  try {
    // Query the database
    const opportunities = await db.query.opportunitiesTable.findMany({
        where: eq(opportunitiesTable.purpose, 'seeking')
    });
    
    // Return the users as a JSON response
    return NextResponse.json(opportunities);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch opportunities" }, { status: 500 });
  }
}