/* eslint-disable @typescript-eslint/no-unused-vars */
// no 'use client' here
import { galleryImages } from "@/app/admin/dashboard/gallery/view/helper";
import Community from "./community";

export default async function GalleryWrapper() {
  const heights = ["h-40", "h-64", "h-80"];
  const images = await galleryImages(); // runs on server

  function shuffle<T>(array: T[]): T[] {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  const shuffledHeights = shuffle(heights);

const heightAssignments = images.map((img, i) => ({
  src: img,
  heightClass: shuffledHeights[i % shuffledHeights.length],
}));

  return <Community images={images} />;
}
