"use client"
/* eslint-disable @typescript-eslint/no-unused-vars */


import { Bell, BellDot, BellOff, Dot, Gauge, HelpCircle, InboxIcon, LightbulbIcon, Loader2, LucideTicketX, Mail, MailOpen, Moon, Sun, Ticket } from "lucide-react";
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
import UserAvatar from "./userAvatar";
import { Activity } from "./account/page";
import { useEffect, useState } from "react";
import { computeUserHealthScore, estimateSessionTime, getLastLogin, getUserKeywordActivityCount } from "./home/activityMetrics";
import { CustomGauge } from "./gauge";
import { Toast } from "@/components/ui/toast";

export default function Header(){
    const { setTheme } = useTheme()
    const [id, setid] = useState("")

    useEffect(() => {
      setid(tokenise()[3])
  }, [])

    let user: UserType[] = []
    let notes: Notify[] = []
    const logged: UserType[] = []
    const { data, error } = useSWR("/api/users", fetcher);
    const { data: notifications, error: notError } = useSWR("/api/notifications", fetcher);
    const { data:tickets, error:ticketError } = useSWR<Ticketing[]>("/api/tickets", fetcher);
    const { data:messages, error:messageError } = useSWR<Message[]>("/api/messages", fetcher);
    const { data:activity, error:activityError } = useSWR<Activity[]>(`/api/activity/${id}`, fetcher);
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
            return "bg-primary/20 text-primary animate-bounce rounded-full w-8 h-8 flex justify-center items-center"
        } else {
            return "bg-secondary rounded-full w-10 h-10 flex justify-center items-center"
        }
    }
    function ticky(){
        if(open.length > 0){
            return "bg-primary/20 text-primary animate-bounce rounded-full w-10 h-10 flex justify-center items-center"
        } else {
            return "bg-secondary rounded-full w-10 h-10 flex justify-center items-center"
        }
    }
    function messaging(){
        if(newMessage){
            return "bg-primary/20 text-primary rounded-full w-10 h-10 flex justify-center items-center"
        } else {
            return "bg-secondary rounded-full w-10 h-10 flex justify-center items-center"
        }
    }
    const today =  new Date()
    const dateToday = today.getDate()+today.getMonth()+today.getFullYear()
  const activitiesToday:Activity[] = []
  activity?.forEach(activity => {
    const date = new Date(activity.activity.createdAt)
    const daysActivity = date.getDate()+date.getMonth()+date.getFullYear()
    if(daysActivity == dateToday){
      activitiesToday.push(activity)
    }
  })

    const lastLogin = getLastLogin(activitiesToday!==undefined?activitiesToday:[]);
  const activityCount = getUserKeywordActivityCount(activitiesToday!==undefined?activitiesToday:[]);
  const sessionMinutes = estimateSessionTime(activitiesToday!==undefined?activitiesToday:[]);

  const healthScore = computeUserHealthScore({
    lastLogin,
    activityCount,
    sessionMinutes
  });
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
      function openSonner(){
        return <Toast value='hey'/>
      }
    return <div className="">
        <div className=" rounded sm:grid sm:grid-cols-2 sm:gap-2">
            <div className="flex gap-2 items-center justify-between">
            <div className="flex items-center gap-2"> 

<div className={healthScore>75?'awesome border text-xs rounded p-1 font-bold my-2 text-center':healthScore>50?'good text-background text-xs rounded p-1 font-bold my-2 text-center':healthScore>25?'fair text-xs text-white rounded p-1 font-bold my-2 text-center':'bad text-xs text-white rounded p-1 font-bold my-2 text-center'}> 
  {healthScore>75?'AWESOME':healthScore>50?'GOOD':healthScore>25?'FAIR':'BAD'}
  </div>  
            {/* <CustomGauge percent={healthScore}/>    */}
            <CustomGauge
              percent={healthScore}
              label="DHP"
              size={80}
              strokeColor="#ccc"  // sky-500
              needleColor="#fa3c00"  // red-500
              showTicks={true}
            />
            </div>
              {activityCount==0?<LightbulbIcon onClick={() => openSonner()} className="text-primary animate-pulse p-2 rounded-full bg-primary/10 h-8 w-8"/>:null}
            {tokenise()[4]=="admin" && 
            <div className=" bg-secondary p-2 rounded-md flex w-2/3 justify-between items-center">
                <div className="text-sm font-medium">Logged In: {logged.length}</div>
                <div className="flex">
                {logged.map(user => {
                  const isValidImage = user.profilePicture?.includes('users');
                  return (
                    <div
                      key={user.id}
                    >
                      {isValidImage ? (
                        <div style={{ position: 'relative', width: '30px', height: '30px' }}
                        className="-ml-4">
                          <Image
                            src={user.profilePicture}
                            alt="User avatar"
                            className="rounded-full border-2 border-secondary"
                            fill
                            unoptimized
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                      ) : (
                        <div
                        className="h-8 w-8 -ml-4 text-sm font-medium border-2 border-secondary bg-primary text-background grid rounded-full justify-center items-center">
                          {user.name?.[0]?.toUpperCase() || "?"}
                        </div>
                      )}
                    </div>
                  );
                })}
                    </div>
                </div>
            }
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
                    {hasNew?<div><BellDot size={18}/></div>:<BellOff size={18}/>}</Link>
                    <Link href="/admin/dashboard/ticket/view" className={ticky()}>
                    {open.length>0?<div><Ticket size={18}/></div>:<LucideTicketX size={18}/>}</Link>
                    <Link href="/admin/dashboard/messages/view" className={messaging()} onClick={handleClick}>
                    {!newMessage?<Mail size={18}/>:<MailOpen size={18}/>}
                    </Link>
                </div>
            </div>
        </div>
    </div>
}