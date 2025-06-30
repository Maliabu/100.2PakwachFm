// lib/get-ad-images.ts
import fs from 'fs';
import path from 'path';

export function getGalleryImages(): string[] {
    const adsPath = path.join(process.cwd(), 'public', 'gallery');
    const files = fs.readdirSync(adsPath);
  
    return files
      .filter((file) => /\.(png|jpe?g|webp|gif)$/i.test(file))
      .map((file) => `/gallery/${file}`);
  }

  export async function galleryImages() {
    const res = await fetch('https://uploads.pakwachfm.com/gallery.php');
    const data: string[] = await res.json();

    return data
  }
