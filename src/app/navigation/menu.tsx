/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import * as React from "react"
import Link from "next/link"
import Logo from '../images/logo (1).png'
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Calendar, ChevronRight, File, Home, Megaphone, Search, User, Video } from "lucide-react"
import { ModeToggle } from "./theme/mode"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { SearchBar } from "./search"
import { NavItem } from "./navItem"

export function Menu() {
  const [images, setImages] = React.useState<string[]>([]);

  React.useEffect(() => {
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
  return (
    <div>
<div className="flex items-center p-4 sm:p-0 bg-white justify-between">
<footer className="row-start- sm:p-3 flex sm:gap-[24px] gap-4 text-sm flex-wrap items-center justify-between sm:justify-start">
    <a
      className="flex items-center gap-2 font-bold tracking-tight hover:underline hover:underline-offset-4"
      href="https://www.linkedin.com/company/pakwach-fm/about"
      target="_blank"
      rel="noopener noreferrer"
    >
    <img src="/linkedin.svg" alt="linkedin" className="w-4 h-4" />
    <div className="text-xs sm:block hidden text-muted-foreground">@linkedin</div>
    </a>
    <a
      className="flex items-center gap-2 font-bold tracking-tight hover:underline hover:underline-offset-4"
      href="https://www.instagram.com/pakwachfm/"
      target="_blank"
      rel="noopener noreferrer"
    >
    <img src="/instagram.svg" alt="instagram" className="w-4 h-4" />
    <div className="text-xs sm:block hidden text-muted-foreground">@instagram</div>

    </a>
    <a
      className="flex items-center gap-2 font-bold tracking-tight hover:underline hover:underline-offset-4"
      href="https://www.instagram.com/pakwachfm/"
      target="_blank"
      rel="noopener noreferrer"
    >
    <img src="/twitter.svg" alt="Twitter" className="w-4 h-4" />
    <div className="text-xs sm:block hidden text-muted-foreground">@twitter</div>
    </a>
    <a
      className="flex items-center gap-2 font-bold tracking-tight hover:underline hover:underline-offset-4"
      href="https://www.instagram.com/pakwachfm/"
      target="_blank"
      rel="noopener noreferrer"
    >
    <img src="/tiktok.svg" alt="tiktok" className="w-4 h-4 text-background" />
    <div className="text-xs sm:block hidden text-muted-foreground">@tiktok</div>

    </a>
    <a
      className="flex items-center font-bold tracking-tight gap-2 hover:underline hover:underline-offset-4"
      href="https://www.facebook.com/100.2pakwachfm"
      target="_blank"
      rel="noopener noreferrer">
    <img src="/facebook.svg" alt="facebook" className="w-4 h-4" />
    <div className="text-xs hidden sm:block text-muted-foreground">@facebook</div>

    </a>
  </footer>
  <SearchBar/>
  </div>
  <div className="on-air p-16 bg-gradient-to-bl background grid grid-cols-12 gap-2">
    <div className="sm:col-span-3">
      <div className="w-60 h-20">
    <Image src={Logo} alt="logo"/></div>
    </div>
  </div>
  <div className="bg-secondary p-2 flex justify-between">
    <Link href='/programming'><Button className="bg-primary">Schedule <ChevronRight size={18}/></Button></Link>
          {images.length > 0?         
          <div className="relative w-full h-24 mx-8">
            <Image
            src={images[0]}
            alt={`Ad ${images[0]}`}
            fill
            unoptimized
            className="object-cover"
          /></div>
          : ''}
  </div>
    <div className="sm:bg-background bg-secondary sm:p-3 sm:rounded-b-lg">
        <div className="justify-between flex">
            <div className="w-30 h-10 hidden sm:block"><Link href='/'><Image src={Logo} alt="logo"/></Link></div>
    <NavigationMenu className="hidden sm:block">
      <NavigationMenuList>
      <NavigationMenuItem>
            <NavigationMenuLink asChild>
            <Link href="/news" className={navigationMenuTriggerStyle()}>
            News
              </Link>
              </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
            <NavigationMenuLink asChild>
            <Link href="/programming" className={navigationMenuTriggerStyle()}>
            Presenters
              </Link>
              </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
            <NavigationMenuLink asChild>
            <Link href="/events" className={navigationMenuTriggerStyle()}>
            Events
              </Link>
              </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
            <NavigationMenuLink asChild>
            <Link href="/news#sports" className={navigationMenuTriggerStyle()}>
            Sports
              </Link>
              </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href='/adverts'><Button><Megaphone size={18}/> Advertise</Button>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <ModeToggle/>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
    <div className="sm:block hidden"><Link href='/videos'><Button><Video/> Videos</Button></Link></div>
    </div>
    <div className="sm:hidden overflow-x-auto w-full p-2 scrollbar-hidden scrollbar-hide bg-background">
  <ul className="flex gap-2 min-w-max">
    <li className="shrink-0">
      <NavItem href="/" label="Home"/>
    </li>
    <li className="shrink-0">
    <NavItem href="/news" label="News"/>
    </li>
    <li className="shrink-0">
    <NavItem href="/programming" label="Programming"/>
    </li>
    <li className="shrink-0">
    <NavItem href="/events" label="Events"/>
    </li>
    <li className="shrink-0">
    <NavItem href="/news#sports" label="Sports"/>
    </li>
    <li className="shrink-0">
    <NavItem href="/community" label="Community"/>
    </li>
    <li className="shrink-0">
    <NavItem href="/services" label="Services"/>
    </li>
    <li className="shrink-0">
      <Link href="/adverts" className="block rounded"><Button><Megaphone size={18}/> Advertise</Button></Link>
    </li>
  </ul>
</div>

    </div>
    </div>
  )
}

export const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
