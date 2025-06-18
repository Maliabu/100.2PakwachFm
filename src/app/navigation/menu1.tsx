"use client"

import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Mail, Mic } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
// import { getAdImages } from "../admin/dashboard/ads/view/helper";

export default function Menu1(){
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    async function fetchImages() {
      const res = await fetch('https://uploads.pakwachfm.com/menuAds.php');
      const data: string[] = await res.json();

      // Shuffle and take up to 3
      const shuffled = data.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);

      setImages(selected);
    }

    fetchImages();
  }, []);
    return(
        <div className="sm:grid sm:grid-cols-12 bg- rounded-md">
          <div className="sm:col-span-12 sm:p-2">
        <NavigationMenu className="rounded-lg hidden sm:block">
          <NavigationMenuList>
          <NavigationMenuItem>
          <Button><Mail size={18}/> Subscribe</Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink asChild>
                <Link href="/services" className={navigationMenuTriggerStyle()}>
                  Services
                  </Link>
                </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink asChild>
                <Link href="/community" className={navigationMenuTriggerStyle()}>
                  Pakwach Community
                  </Link>
                </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href='/videos#music'>
              <Button><Mic size={18}/> Music</Button></Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        </div>
        <div className="sm:col-span-6 hidden flex">
      {images.map((src, index) => (
        <div key={index} className=" relative w-full h-24">
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
        </div>
    )
}