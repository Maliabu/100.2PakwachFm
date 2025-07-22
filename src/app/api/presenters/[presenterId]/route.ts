
import { db } from '@/db/db';
import { presentersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

// API route handler for GET requests
export async function GET(request: Request, { params }: { params: { presenterId: string } }) {
  const { presenterId } = await params; // Get the articleId from the URL
    // Query the database for the article by `articleId`
      
    const presenter = await db
    .query
    .presentersTable
    .findFirst({
      where: eq(presentersTable.id, parseInt(presenterId)),
    })

      if (!presenter) {
        return NextResponse.json({ message: 'Programme not found' }, { status: 404 });
      }
      return NextResponse.json(presenter);
}