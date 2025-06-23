import { db } from "@/db/db"
import { webEvents } from "@/db/schema"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Get all stored events
    const events = await db.select().from(webEvents)

    return NextResponse.json(
      events
    )
  } catch (error) {
    console.error("Failed to fetch events:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
