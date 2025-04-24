import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Mail, Mic } from "lucide-react";
import Link from "next/link";

export default function Menu1(){
    return(
        <div>
        <NavigationMenu className="rounded-lg hidden sm:block">
          <NavigationMenuList>
          <NavigationMenuItem>
          <Button><Mail size={18}/> Subscribe</Button>
            </NavigationMenuItem>
            {/* <NavigationMenuItem>
              <NavigationMenuTrigger>Subscribe</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <File className="h-6 w-6" />
                        <div className="mb-2 mt-4 text-lg font-medium">
                          shadcn/ui
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Beautifully designed components built with Radix UI and
                          Tailwind CSS.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/docs" title="Introduction">
                    Re-usable components built using Radix UI and Tailwind CSS.
                  </ListItem>
                  <ListItem href="/docs/installation" title="Installation">
                    How to install dependencies and structure your app.
                  </ListItem>
                  <ListItem href="/docs/primitives/typography" title="Typography">
                    Styles for headings, paragraphs, lists...etc
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem> */}
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
    )
}