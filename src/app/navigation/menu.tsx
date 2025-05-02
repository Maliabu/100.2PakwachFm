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
      const res = await fetch('/api/menuAd');
      const data: string[] = await res.json();

      // Shuffle and take up to 3
      const shuffled = data.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);

      setImages(selected);
    }

    fetchImages();
  }, []);
  return (
    <div><footer className="row-start-3 sm:p-3 p-4 bg-black text-white sm:rounded-t-lg flex gap-[24px] text-sm flex-wrap items-center justify-center">
      <div className="text-sm">Follow us on:</div>
    <a
      className="flex items-center sm:gap-2 font-bold tracking-tight hover:underline hover:underline-offset-4"
      href="https://www.linkedin.com/company/pakwach-fm/about"
      target="_blank"
      rel="noopener noreferrer"
    >
    <div className="font-bold rounded-full border-2 w-9 h-9 grid items-center justify-center">ln</div>
      <span className="sm:block hidden">linkedIn</span>
    </a>
    <a
      className="flex items-center gap-2 font-bold tracking-tight hover:underline hover:underline-offset-4"
      href="https://www.instagram.com/pakwachfm/"
      target="_blank"
      rel="noopener noreferrer"
    >
    <div className="font-bold rounded-full border-2 w-9 h-9 grid items-center justify-center">i</div>
    <span className="sm:block hidden">instagram</span>
    </a>
    <a
      className="flex items-center font-bold tracking-tight sm:gap-2 hover:underline hover:underline-offset-4"
      href="https://www.facebook.com/100.2pakwachfm"
      target="_blank"
      rel="noopener noreferrer">
    <div className="font-bold rounded-full border-2 w-9 h-9 grid items-center justify-center">f</div>
    <span className="sm:block hidden">facebook</span>
    </a>
  </footer>
  <div className="on-air p-16 background grid grid-cols-12 gap-2">
    <div className="sm:col-span-3">
      <div className="w-60 h-20">
    <Image src={Logo} alt="logo"/></div>
    </div>
  </div>
  <div className="bg-secondary p-3 flex justify-between">
    <Link href='/programming'><Button className="bg-primary">Schedule <ChevronRight size={18}/></Button></Link>
        <div className="relative w-full h-24 mx-8">
          {images.length > 0? <Image
            src={images[0]}
            alt={`Ad ${images[0]}`}
            fill
            className="object-cover"
            unoptimized
          />: 'ad'}
    </div>
  <SearchBar/></div>
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
    <div className="sm:hidden overflow-x-auto w-full py-2 scrollbar-hidden scrollbar-hide bg-background">
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
