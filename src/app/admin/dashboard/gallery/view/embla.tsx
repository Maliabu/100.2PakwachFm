'use client';

import { Skeleton } from '@/components/ui/skeleton';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';

export default function AdCarousel({ galleryImages }: { galleryImages: string[] }) {
  const [emblaRef] = useEmblaCarousel({ loop: true });

  return (
    <div className="" ref={emblaRef}>
        <div className='text-sm text-muted-foreground uppercase py-4'>Community Gallery</div>
      <div className="sm:grid sm:grid-cols-12">
        {galleryImages.length > 0 ? galleryImages.map((src, index) => (
          <div className="sm:col-span-3" key={index}>
            <Image
              src={src}
              alt={`Ad ${index}`}
              width={800}
              height={400}
              unoptimized
              className="w-full object-cover"
            />
          </div>
        )) : <div className="sm:col-span-12 flex flex-col space-y-3 bg-background rounded-lg mt-2 items-center justify-center p-6">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>}
      </div>
    </div>
  );
}
