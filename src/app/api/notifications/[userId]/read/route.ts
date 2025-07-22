
// pages/api/users/[userId].ts

import { db } from '@/db/db';
import { notificationUsersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

// API route handler for GET requests
export async function GET(request: Request, { params }: { params: { userId: string } }) {
  const { userId } = await params; // Get the userId from the URL
    // Query the database for the user by `userId`
    const notes = await db
      .update(notificationUsersTable)
      .set({status: 'read'})
      .where(eq(notificationUsersTable.user, parseInt(userId)))

      if (!notes) {
        return NextResponse.json({ message: 'notifications not found' }, { status: 404 });
      }
      return NextResponse.json(notes);
}