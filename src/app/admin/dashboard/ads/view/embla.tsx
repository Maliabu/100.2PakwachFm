'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';

export default function AdCarousel({ images, menuAds }: { images: string[], menuAds: string[] }) {
  const [emblaRef] = useEmblaCarousel({ loop: true });

  return (
    <div className="overflow-hidden" ref={emblaRef}>
        <div className='text-sm text-muted-foreground uppercase py-4'>Column Ads</div>
      <div className="sm:grid sm:grid-cols-12">
        {images.map((src, index) => (
          <div className="sm:col-span-3" key={index}>
            <Image
              src={src}
              alt={`Ad ${index}`}
              width={800}
              height={400}
              className="w-full object-cover"
            />
          </div>
        ))}
      </div>
      <div className='text-sm text-muted-foreground uppercase py-4'>Menu Ads</div>
      <div className="sm:grid sm:grid-cols-12">
        {menuAds.map((src, index) => (
          <div className="sm:col-span-3" key={index}>
            <Image
              src={src}
              alt={`Ad ${index}`}
              width={800}
              height={400}
              className="w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
