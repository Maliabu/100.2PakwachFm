
import { db } from '@/db/db';
import { activityTable, ticketingTable, usersTable } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

// API route handler for GET requests
export async function GET(request: Request, { params }: { params: { userId: string } }) {
  const { userId } = await params; // Get the articleId from the URL
    // Query the database for the article by `articleId`
      
    const activities = 
    await db.select()
    .from(activityTable)
    .where(eq(activityTable.user, parseInt(userId)))
    .leftJoin(usersTable, eq(activityTable.user, usersTable.id))
    .leftJoin(ticketingTable, eq(activityTable.user, ticketingTable.opened))
    .orderBy(desc(activityTable.createdAt));

      if (!activities) {
        return NextResponse.json({ message: 'Activities not found' }, { status: 404 });
      }
      return NextResponse.json(activities);
}