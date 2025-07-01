
import { db } from '@/db/db';
import { messagesTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

// API route handler for GET requests
export async function GET(request: Request, { params }: { params: { messageId: string } }) {
  const { messageId } = await params; // Get the articleId from the URL
    // Query the database for the article by `articleId`
      
    const message = await db
    .query
    .messagesTable
    .findFirst({
      where: eq(messagesTable.id, parseInt(messageId)),
    })

      if (!message) {
        return NextResponse.json({ message: 'message not found' }, { status: 404 });
      }
      return NextResponse.json(message);
}