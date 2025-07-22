/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Button } from "@/components/ui/button";
import { date, fetcher, tokenise } from "@/services/services";
import { AlertTriangle, Loader2, PlusCircle } from "lucide-react";
import Link from "next/link";
import useSWR from "swr";
import { Notifications } from "../../types";

export default function Notification(){
    let notify: Notifications[] = []
    const userId = tokenise()[3]
    const userType = tokenise()[4]
    const { data, error } = useSWR(`/api/notifications/${userId}`, fetcher);
    if(data){
        notify = data
    }
    if (!data) return <div className="flex p-6 bg-background rounded-md justify-center items-center mt-2"><Loader2 className="animate-spin"/></div>;

    const today = new Date()

    function status(status: string){
        if(status == "new"){
            return 'text-xs p-2 rounded-full text-green-600 dark:text-black bg-green-100 dark:bg-green-600 uppercase float-right'
        } else {
            return 'text-xs p-2 rounded-full text-gray-700 bg-gray-100 dark:bg-muted uppercase float-right'
        }
    }
    return (
        <div className="sm:p-6 p-2 bg-background rounded-lg mt-2">
            <div className="flex justify-between items-center">
            <div className="text-2xl font-bold tracking-tight">Notifications</div>
            <div className="h-10 w-10 border-1 border-black dark:border-white text-md rounded-full flex justify-center items-center ">{notify.length}</div>
            {userType==='admin' && <Link href='/admin/dashboard/notifications'><Button><PlusCircle/> Add Notifications</Button></Link>}
            </div>
            <div className="bg-secondary rounded-lg sm:p-6 p-4 sm:w-3/4 mt-6 admin">
            
            { notify.length>0?
                        notify.map((notes, index) => (
                            <div key={index} className="grid grid-cols-12 mb-1 gap-4">
                     <div className="col-span-1 h-10 w-10 bg-primary text-muted text-2xl rounded-full flex justify-center items-center ">S</div>
                     <div className="col-span-11 sm:p-6 p-4 mx-4 bg-background flex justify-between rounded-lg">
                        <div>
                     <div className="text-xs text-muted-foreground">from: system</div>
                       <div className="text-sm my-3">{notes.notifications.notification}</div>
                       <div className="float-right text-xs text-muted-foreground p-2">{date(notes.notifications.createdAt.toString())}</div>
                       </div>
                       <div>
                       <div className={status(notes.notification_users.status)}>{notes.notification_users.status}</div></div>
                       </div>
                            </div>
                        )):<div className=" flex flex-col mt-20 text-muted-foreground items-center">
                            <AlertTriangle size={80}/>
                            No notifications yet!
                            </div>
                    }
            </div>
        </div>
    )
}