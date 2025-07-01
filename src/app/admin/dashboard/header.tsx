"use client"
/* eslint-disable @typescript-eslint/no-unused-vars */


import { Bell, Dot, HelpCircle, InboxIcon, Loader2, Mail, MailOpen, Moon, Sun, Ticket } from "lucide-react";
import Profile from "../auth/profile";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { fetcher, tokenise } from "@/services/services";
import useSWR from "swr";
import { UserType } from "./types";
import Image from "next/image";
import Link from "next/link";
import { Notify } from "./notifications/view/page";
import { Ticketing } from "./home/page";
import { Message } from "./messages/view/page";

export default function Header(){
    const { setTheme } = useTheme()
    let user: UserType[] = []
    let notes: Notify[] = []
    const logged: UserType[] = []
    const { data, error } = useSWR("/api/users", fetcher);
    const { data: notifications, error: notError } = useSWR("/api/notifications", fetcher);
    const { data:tickets, error:ticketError } = useSWR<Ticketing[]>("/api/tickets", fetcher);
    const { data:messages, error:messageError } = useSWR<Message[]>("/api/messages", fetcher);
    const open: Ticketing[] = []
    const closed: Ticketing[] = []
    let message: Message[] = []
 
    if(data){
        user = data
        user.forEach(user => {
            if(user.isLoggedIn == true){
                logged.push(user)
            }
        })
    }
    if(tickets){
        tickets.forEach(ticket => {
          if(ticket.tickets.status==='open'){
            open.push(ticket)
          } else{
            closed.push(ticket)
          }
        })
      }
      if(messages){
        message = messages
      }
    if (!data) return <div className="flex bg-background rounded-md justify-center items-center mt-2"><Loader2 className="animate-spin"/>Loading Users ...</div>;
    if(notifications){
        notes = notifications
    }
    let hasNew = notes?.some((n: Notify) => n.status === "new");
    const newMessage = message?.some((n: Message) => n.status === "new");
    function notify(){
        if(hasNew){
            return "bg-orange-400/20 dark:text-orange-400 text-orange-600 animate-bounce rounded-full w-8 h-8 flex justify-center items-center"
        } else {
            return "bg-secondary rounded-full w-10 h-10 flex justify-center items-center"
        }
    }
    function ticky(){
        if(open.length > 0){
            return "bg-orange-400/20 dark:text-orange-400 text-orange-600 animate-bounce rounded-full w-10 h-10 flex justify-center items-center"
        } else {
            return "bg-secondary rounded-full w-10 h-10 flex justify-center items-center"
        }
    }
    function messaging(){
        if(newMessage){
            return "bg-orange-400/20 dark:text-orange-400 text-orange-600 rounded-full w-10 h-10 flex justify-center items-center"
        } else {
            return "bg-secondary rounded-full w-10 h-10 flex justify-center items-center"
        }
    }
    const handleClick = async () => {
        hasNew = false;
        const userId = tokenise()[3]
    
        // Mark notifications as read
        await fetch(`/api/notifications/${userId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            }
          });
          
      };
    return <div className="">
        <div className=" rounded sm:grid sm:grid-cols-2 sm:gap-2">
            <div className="">
            {tokenise()[4]=="admin" && 
            <div className=" bg-secondary p-2 rounded-md flex justify-between items-center">
                <div className="text-sm font-medium">Logged in users: {logged.length}</div>
                <div className="flex">{logged.map(user => (
                    <div key={user.id} className="h-8 w-8 -ml-4 bg-background shadow-md text-foreground grid rounded-full justify-center items-center">{user.profilePicture?<div style={{ position: 'relative', width: '30px', height: '30px' }}>
                    <Image
                        src={user.profilePicture}
                        alt="Full size"
                        className="rounded-full"
                        fill
                        unoptimized
                        style={{ objectFit: 'cover' }} // or 'contain'
                    />
                    </div>:user.name[0].toUpperCase()}</div>
                ))}</div>
            </div>}
            </div>
            <div className="sm:mt-0 mt-2">
                <div className="flex items-center sm:justify-end gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="border border-black dark:border-white/50 shadow-none">
                            <div className="flex justify-center border-none items-center">
                        <Sun className="h-[1.2rem] w-full rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="mr-3 h-[1.2rem] w-full rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="">Light/Dark</span></div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                        Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                        Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                        System
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                    <div>
                    <Profile/></div>
                    <Link href="/admin/dashboard/notifications/view" className={notify()} onClick={handleClick}>
                    <Bell size={18}/><Dot className="absolute -mt-5 -mr-4" size={40}/></Link>
                    <Link href="/admin/dashboard/ticket" className={ticky()}>
                    <Ticket size={18}/></Link>
                    <Link href="/admin/dashboard/messages" className={messaging()} onClick={handleClick}>
                    {!newMessage?<Mail size={18}/>:<MailOpen size={18}/>}
                    </Link>
                </div>
            </div>
        </div>
    </div>
}