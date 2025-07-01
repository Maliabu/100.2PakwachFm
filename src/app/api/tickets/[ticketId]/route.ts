
import { db } from '@/db/db';
import { ticketingTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

// API route handler for GET requests
export async function GET(request: Request, { params }: { params: { ticketId: string } }) {
  const { ticketId } = await params; // Get the articleId from the URL
    // Query the database for the article by `articleId`
      
    const ticket = await db
    .query
    .ticketingTable
    .findFirst({
      where: eq(ticketingTable.id, parseInt(ticketId)),
    })

      if (!ticket) {
        return NextResponse.json({ message: 'ticket not found' }, { status: 404 });
      }
      return NextResponse.json(ticket);
}