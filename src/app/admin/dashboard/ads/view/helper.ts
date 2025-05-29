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

  export async function columnImages() {
    const res = await fetch('https://uploads.pakwachfm.com/columnAds.php');
    const data: string[] = await res.json();

    // Shuffle and take up to 3
    const shuffled = data.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    return selected
  }

  export async function menuImages() {
    const res = await fetch('https://uploads.pakwachfm.com/menuAds.php');
    const data: string[] = await res.json();

    // Shuffle and take up to 3
    const shuffled = data.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    return selected
  }
