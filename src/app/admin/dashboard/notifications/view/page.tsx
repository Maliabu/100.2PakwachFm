/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { date, fetcher } from "@/services/services";
import { Loader2 } from "lucide-react";
import useSWR from "swr";

export type Notify = {
    id: number;
    notification: string;
    createdAt: Date;
    updatedAt: Date;
    status: string;
    users: {
        name: string
    }
}

export default function Notifications(){
    let notify: Notify[] = []
    const { data, error } = useSWR("/api/notifications", fetcher);
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
            <div className="h-10 w-10 bg-primary text-md text-muted font-bold rounded-full flex justify-center items-center ">{notify.length}</div>
            </div>
            <div className="bg-secondary rounded-lg sm:p-6 p-4 sm:w-3/4 mt-6 admin">
            
            { notify.length>0?
                        notify.map((notes, index) => (
                            <div key={index} className="grid grid-cols-12 mb-1 gap-4">
                     <div className="col-span-1 h-10 w-10 bg-primary text-muted text-2xl rounded-full flex justify-center items-center ">S</div>
                     <div className="col-span-11 sm:p-6 p-4 mx-4 bg-background flex justify-between rounded-lg">
                        <div>
                     <div className="text-xs font-bold text-muted-foreground">from: system</div>
                       <div className="text-sm">{notes.notification}</div>
                       <div className="float-right text-xs text-muted-foreground p-2 font-bold">{date(notes.createdAt.toString())}</div>
                       </div>
                       <div>
                       <div className={status(notes.status)}>{notes.status}</div></div>
                       </div>
                            </div>
                        )):<div>No notifications</div>
                    }
            </div>
        </div>
    )
}