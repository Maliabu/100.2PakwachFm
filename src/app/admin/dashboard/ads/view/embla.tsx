'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';

export default function AdCarousel({ images, menuAds }: { images: string[], menuAds: string[] }) {
  const [emblaRef] = useEmblaCarousel({ loop: true });

  return (
    <div className="" ref={emblaRef}>
      <Tabs defaultValue="columns" className="">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="columns">
        <div className=''>Column Ads</div>
        </TabsTrigger>
        <TabsTrigger value="menus">
        <div className=''>Menu Ads</div>
        </TabsTrigger>
        </TabsList>
        <TabsContent value='columns' className='bg-background p-4 rounded-lg'>
        <div className='text-sm text-muted-foreground uppercase py-4'>Column Ads</div>
      <div className="sm:grid sm:grid-cols-12">
        {images.length > 0 ? images.map((src, index) => (
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
        </TabsContent>
        <TabsContent value='menus' className='bg-background p-4 rounded-lg'>
      <div className='text-sm text-muted-foreground uppercase py-4'>Menu Ads</div>
      <div className="sm:grid sm:grid-cols-12">
        {menuAds.length > 0 ? menuAds.map((src, index) => (
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
        )): <div className="sm:col-span-12 flex flex-col space-y-3 bg-background rounded-lg mt-2 items-center justify-center p-6">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>}
      </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
