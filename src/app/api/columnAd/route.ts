// /app/api/ads/route.ts (App Router)

import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  const adsPath = path.join(process.cwd(), 'public', 'columnAd');
  const files = fs.readdirSync(adsPath);

  const imageFiles = files
    .filter((file) => /\.(png|jpe?g|webp|gif)$/i.test(file))
    .map((file) => `/columnAd/${file}`);

  return NextResponse.json(imageFiles);
}
