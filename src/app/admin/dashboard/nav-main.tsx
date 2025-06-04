/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { useEffect, useState } from "react"
import { tokenise } from "@/services/services"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      icon: LucideIcon
      url: string
    }[]
  }[]
}) {
  const [idType, setId] = useState("")
  useEffect(() => {
      setId(tokenise()[4])
  }, [])
  // Filter items based on userType
  const filteredItems = items.filter(item => {
    // Example: Hide entire "Articles" section if user is not admin
    if ((item.title === "Users" || item.title === 'Notifications') && idType !== "admin") {
      return false;
    }
    return true;
  });
  
  return (
    <SidebarGroup>
      {/* <SidebarGroupLabel>Dashboard</SidebarGroupLabel> */}
      <SidebarMenu>
        {filteredItems.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className={item.isActive == true?"group/collapsible":"group/collapsible"}
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title} className="">
                  {item.icon && <item.icon className="text-" type=""/>}
                  <div className="font-medium text-sm">{item.title}</div>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.url}>
                          {<subItem.icon/>}
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}