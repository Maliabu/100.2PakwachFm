"use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./appSideBar"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Header from "./header"

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  useEffect(() => {
    const token = window.localStorage.getItem("token")
    if(token == "") return router.push("/admin")
    setMounted(true)
  },[router])
  return (
    <div>
    {mounted && <SidebarProvider>
      <AppSidebar />
      <main className=" sm:p-6 w-full">
        <div className="grid grid-cols-12 bg-background p-2 rounded-lg">
        <SidebarTrigger />
        <div className="sm:col-span-10">        
          <Header/>
        </div>
        </div>
        {children}
      </main>
    </SidebarProvider>}
    </div>
  )
}