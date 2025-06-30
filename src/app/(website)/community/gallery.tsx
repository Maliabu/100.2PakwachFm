/* eslint-disable @next/next/no-img-element */
'use client';

import { motion } from "framer-motion";
import React from "react";

interface GalleryItem {
  src: string;
  heightClass: string;
}

export interface GalleryProps {
  images?: string[]; // raw image URLs
  items?: GalleryItem[]; // preprocessed with heights
}

const defaultHeights = ["h-40", "h-64", "h-80"];

export default function CommunityGallery({ images, items }: GalleryProps) {
  const galleryItems: GalleryItem[] = React.useMemo(() => {
    if (items) return items;
    if (images) {
      return images.map((img, i) => ({
        src: img,
        heightClass: defaultHeights[i % defaultHeights.length],
      }));
    }
    return [];
  }, [images, items]);

  function chunkIntoColumns<T>(arr: T[], columns = 4): T[][] {
    const result = Array.from({ length: columns }, () => [] as T[]);
    arr.forEach((item, i) => {
      result[i % columns].push(item);
    });
    return result;
  }

  const columns = chunkIntoColumns(galleryItems, 4);

  return (
    <div className="grid grid-cols-12 gap-1">
      {columns.map((col, colIndex) => (
        <div key={colIndex} className="sm:col-span-3 col-span-3">
          {col.map((item, imgIndex) => (
            <motion.div
              key={imgIndex}
              className={`${item.heightClass} w-full rounded-lg bg-background my-1 relative overflow-hidden`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <img
                src={item.src}
                alt={`Gallery image ${imgIndex}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
}
