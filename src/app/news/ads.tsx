"use client"
import * as React from "react"

import Image from "next/image";


export function Ads() {
    const [images, setImages] = React.useState<string[]>([]);
  
    React.useEffect(() => {
      async function fetchImages() {
        const res = await fetch('/api/columnAd');
        const data: string[] = await res.json();
  
        // Shuffle and take up to 3
        const shuffled = data.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 2);
  
        setImages(selected);
      }
  
      fetchImages();
    }, []);
  return (
    <div>
      {images.map((src, index) => (
        <div key={index} className="flex relative w-full h-96">
          <Image
            src={src}
            alt={`Ad ${index}`}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      ))}
    </div>
  )
}
