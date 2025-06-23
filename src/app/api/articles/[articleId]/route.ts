
import { db } from '@/db/db';
import { articlesTable } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

// API route handler for GET requests
export async function GET(request: Request, { params }: { params: { articleId: string } }) {
  const { articleId } = await params; // Get the articleId from the URL
    // Query the database for the article by `articleId`
      
    const article = await db
    .query
    .articlesTable
    .findMany({
      where: eq(articlesTable.id, parseInt(articleId)),
      orderBy: [desc(articlesTable.createdAt)],
    })

      if (!article) {
        return NextResponse.json({ message: 'article not found' }, { status: 404 });
      }
      return NextResponse.json(article);
}