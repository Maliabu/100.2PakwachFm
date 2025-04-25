/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "@/db/db";
import { articlesTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// This will handle the GET request to /api/packaging
export async function GET() {
  try {
    // Query the database
    const articles = await db.query.articlesTable.findMany({
        where: eq(articlesTable.articleType, 'sport')
    });
    
    // Return the events as a JSON response
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
  }
}