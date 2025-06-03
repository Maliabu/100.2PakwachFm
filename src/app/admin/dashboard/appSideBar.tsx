/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { BarChart, Calendar, CalendarArrowDown, ChartBar, ChartBarIcon, Delete, File, FileArchive, FileEdit, Home, Info, LineChart, List, ListChecks, Mic, Paperclip, PenToolIcon, Pill, Play, Plus, Receipt, Settings2, ShoppingBasket, Store, StoreIcon, Sun, Tag, Ticket, TruckIcon, User, UserCheck2, Users, Video, View, Wallet } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import Logout from "../auth/logout"
import Logged from "../auth/user"
import { NavMain } from "./nav-main"
import Logo from '@/app/images/logo (1).png'
import Image from "next/image"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Home",
      url: "/admin/dashboard/home",
      icon: Home,
      isActive: true,
      items: [
        {
          title: "Overview",
          icon: LineChart,
          url: "/admin/dashboard/home",
        },
      ],
    },
    {
      title: "Articles",
      url: "#",
      icon: File,
      isActive: false,
      items: [
        {
          title: "Add",
          icon: Plus,
          url: "/admin/dashboard/articles",
        },        
        {
          title: "View",
          icon: Paperclip,
          url: "/admin/dashboard/articles/view",
        },
      ],
    },
    {
      title: "Programming",
      url: "#",
      icon: List,
      isActive: false,
      items: [
        {
          title: "Add",
          icon: Plus,
          url: "/admin/dashboard/programming",
        },
      ],
    },
    {
      title: "Events",
      url: "#",
      icon: Calendar,
      isActive: false,
      items: [
        {
          title: "Add",
          icon: Plus,
          url: "/admin/dashboard/events",
        },
        {
          title: "View",
          icon: CalendarArrowDown,
          url: "/admin/dashboard/events/view",
        },
      ],
    },
    {
      title: "Ads",
      url: "#",
      icon: Video,
      isActive: false,
      items: [
        {
          title: "Add",
          icon: Plus,
          url: "/admin/dashboard/ads",
        },       
        {
          title: "View",
          icon: Paperclip,
          url: "/admin/dashboard/ads/view",
        },
      ],
    },
    {
      title: "Videos",
      url: "#",
      icon: Play,
      isActive: false,
      items: [
        {
          title: "Add",
          icon: Plus,
          url: "/admin/dashboard/videos",
        },
      ],
    },
    {
      title: "Music",
      url: "#",
      icon: Mic,
      isActive: false,
      items: [
        {
          title: "Add",
          icon: Plus,
          url: "/admin/dashboard/music",
        },
      ],
    },
    {
      title: "Users",
      url: "#",
      icon: Users,
      isActive: false,
      items: [
        {
          title: "Add",
          icon: Plus,
          url: "/admin/dashboard/user",
        },
        {
          title: "View",
          icon: UserCheck2,
          url: "/admin/dashboard/users",
        },
      ],
    },
    {
      title: "Notifications",
      url: "#",
      icon: Info,
      isActive: false,
      items: [
        {
          title: "Add",
          icon: Plus,
          url: "/admin/dashboard/notifications",
        },
        {
          title: "View",
          icon: UserCheck2,
          url: "/admin/dashboard/notifications/view",
        },
      ],
    },
    {
      title: "Tickets",
      url: "#",
      icon: Ticket,
      isActive: false,
      items: [
        {
          title: "Add",
          icon: Plus,
          url: "/admin/dashboard/ticket",
        },
        {
          title: "View",
          icon: UserCheck2,
          url: "/admin/dashboard/ticket/view",
        },
      ],
    },
  ],
}

export function AppSidebar() {
  return (
    <Sidebar className="border-none">
      <SidebarHeader>
        <div className="h-20 w-40 p-3 rounded-lg">
          <Image src={Logo} alt="logo"/>
        </div>
      </SidebarHeader>
      <SidebarContent>
      <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <Logged/>
        <Logout/>
        <p className="text-xs text-center">&copy;copyright.pakwachfm@{new Date().getFullYear()}</p>
      </SidebarFooter>
    </Sidebar>
  )
}
