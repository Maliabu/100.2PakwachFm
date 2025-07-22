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
    {mounted && <SidebarProvider className="bg-secondary">
      <AppSidebar />
      <main className="p-2 w-full ">
        <div className="sm:grid sm:grid-cols-12 items-center bg-background p-2 rounded-lg">
        <div className="sm:col-span-1"><SidebarTrigger /></div>
        <div className="sm:col-span-11">        
          <Header/>
        </div>
        </div>
        {children}
      </main>
    </SidebarProvider>}
    
    </div>
  )
}