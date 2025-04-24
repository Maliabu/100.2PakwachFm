/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { BarChart, ChartBar, ChartBarIcon, Delete, File, FileArchive, FileEdit, Home, LineChart, List, ListChecks, Mic, PenToolIcon, Pill, Play, Plus, Receipt, Settings2, ShoppingBasket, Store, StoreIcon, Sun, Tag, TruckIcon, User, Video, View, Wallet } from "lucide-react"

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
  ],
}

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="h-20 w-30 p-3 rounded-lg">
          <Image src={Logo} alt="logo"/>
        </div>
      </SidebarHeader>
      <SidebarContent>
      <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <Logged/>
        <Logout/>
      </SidebarFooter>
    </Sidebar>
  )
}
