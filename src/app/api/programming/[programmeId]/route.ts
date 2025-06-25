
import { db } from '@/db/db';
import { programmingTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

// API route handler for GET requests
export async function GET(request: Request, { params }: { params: { programmeId: string } }) {
  const { programmeId } = await params; // Get the articleId from the URL
    // Query the database for the article by `articleId`
      
    const programme = await db
    .query
    .programmingTable
    .findFirst({
      where: eq(programmingTable.id, parseInt(programmeId)),
    })

      if (!programme) {
        return NextResponse.json({ message: 'Programme not found' }, { status: 404 });
      }
      return NextResponse.json(programme);
}