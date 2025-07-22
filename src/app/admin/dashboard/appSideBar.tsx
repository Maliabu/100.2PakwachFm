/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { BarChart, Calendar, CalendarArrowDown, ChartBar, ChartBarIcon, CheckCheck, Delete, File, FileArchive, FileArchiveIcon, FileEdit, GraduationCap, Home, ImageIcon, Info, LineChart, List, ListChecks, LucideFileImage, Mail, MailCheck, Mic, Paperclip, PenToolIcon, Pill, Play, Plus, Receipt, Settings2, ShoppingBasket, Store, StoreIcon, Sun, Tag, Ticket, TicketCheck, TruckIcon, User, UserCheck2, UserCheck2Icon, Users, Video, Videotape, View, Wallet } from "lucide-react"

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
      title: "Presenters",
      url: "#",
      icon: Mic,
      isActive: false,
      items: [
        {
          title: "Add",
          icon: Mic,
          url: "/admin/dashboard/presenters",
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
          icon: Videotape,
          url: "/admin/dashboard/ads/view",
        },
      ],
    },
    {
      title: "Community Gallery",
      url: "#",
      icon: ImageIcon,
      isActive: false,
      items: [
        {
          title: "Add",
          icon: Plus,
          url: "/admin/dashboard/gallery",
        },       
        {
          title: "View",
          icon: LucideFileImage,
          url: "/admin/dashboard/gallery/view",
        },
      ],
    },
    {
      title: "Opportunities Board",
      url: "#",
      icon: GraduationCap,
      isActive: false,
      items: [
        {
          title: "Add",
          icon: Plus,
          url: "/admin/dashboard/opportunities",
        },       
        {
          title: "View",
          icon: FileArchiveIcon,
          url: "/admin/dashboard/opportunities/view",
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
          icon: CheckCheck,
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
          icon: TicketCheck,
          url: "/admin/dashboard/ticket/view",
        },
      ],
    },
    {
      title: "Messages",
      url: "#",
      icon: Mail,
      isActive: false,
      items: [
        {
          title: "Add",
          icon: Plus,
          url: "/admin/dashboard/messages",
        },
        {
          title: "View",
          icon: MailCheck,
          url: "/admin/dashboard/messages/view",
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
