// lib/get-ad-images.ts
import fs from 'fs';
import path from 'path';

export function getAdImages(): string[] {
  const adsPath = path.join(process.cwd(), 'public', 'columnAd');
  const files = fs.readdirSync(adsPath);

  return files
    .filter((file) => /\.(png|jpe?g|webp|gif)$/i.test(file))
    .map((file) => `/columnAd/${file}`);
}

export function getMenuAds(): string[] {
    const adsPath = path.join(process.cwd(), 'public', 'menuAd');
    const files = fs.readdirSync(adsPath);
  
    return files
      .filter((file) => /\.(png|jpe?g|webp|gif)$/i.test(file))
      .map((file) => `/menuAd/${file}`);
  }
