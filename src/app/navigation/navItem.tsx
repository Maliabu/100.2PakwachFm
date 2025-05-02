'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils'; // ShadCN utility

interface NavItemProps {
  href: string;
  label: string;
}

export function NavItem({ href, label }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <NavigationMenu>
        <NavigationMenuItem>
    <NavigationMenuLink asChild>
      <Link
        href={href}
        className={cn(
          navigationMenuTriggerStyle(),
          isActive && 'font-bold py-2 border-b-primary rounded-0 border-b-2 text-primary' // or your own active styles
        )}
      >
        {label}
      </Link>
    </NavigationMenuLink>
    </NavigationMenuItem>
    </NavigationMenu>
  );
}
