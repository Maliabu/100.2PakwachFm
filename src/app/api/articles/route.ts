/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "@/db/db";
import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { articlesTable } from "@/db/schema";

// Handles GET request to /api/packaging
export async function GET() {
  try {
    // Query the database in descending order by createdAt
    const articles = await db.query.articlesTable.findMany({
      orderBy: [desc(articlesTable.createdAt)],
    });

    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
  }
}
