import { db } from "@/db/db";
import { notificationUsersTable, notificationsTable } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// This will handle the GET request to /api/users
export async function GET(request: Request, { params }: { params: { userId: string } }) {
  const { userId } = await params; // Get the userId from the URL

  try {
    // Query the database
    const notifications = await db
    .select()
    .from(notificationUsersTable)
    .innerJoin(notificationsTable, eq(notificationsTable.id, notificationUsersTable.notification))
    .where(eq(notificationUsersTable.user, parseInt(userId)))
    .orderBy(desc(notificationsTable.createdAt))
      
    // Return the users as a JSON response
    return NextResponse.json(notifications);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 });
  }
}