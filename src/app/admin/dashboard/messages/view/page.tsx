/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Button } from "@/components/ui/button";
import { date, fetcher } from "@/services/services";
import { Loader2 } from "lucide-react";
import useSWR from "swr";

export type Message = {
    id: number;
    message: string;
    createdAt: Date;
    updatedAt: Date;
    status: string;
    email: string;
}

export default function Messages(){
    let notify: Message[] = []
    const { data, error } = useSWR("/api/messages", fetcher);
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
            <div className="text-2xl font-bold tracking-tight">Web Messages</div>
            <div className="h-10 w-10 bg-primary text-md text-muted font-bold rounded-full flex justify-center items-center ">{notify.length}</div>
            </div>
            <div className="bg-secondary rounded-lg sm:p-6 p-4 sm:w-3/4 mt-6 admin">
            
            { notify.length>0?
                        notify.map((notes, index) => (
                            <div key={index} className="grid grid-cols-12 mb-1 gap-4">
                     <div className="col-span-1 h-10 w-10 bg-primary text-muted text-2xl rounded-full flex justify-center items-center ">{notes.email[0].toUpperCase()}</div>
                     <div className="col-span-9 sm:p-6 p-4 mx-4 flex justify-between bg-background rounded-lg">
                        <div>
                     <div className="text-xs font-bold text-primary">{notes.email}</div>
                       <div className="text-sm font-medium mt-2">{notes.message}</div>
                       <div className="float-right text-xs text-primary p-2 font-bold">{date(notes.createdAt.toString())}</div>
                       </div>
                       <div><div className={status(notes.status)}>{notes.status}</div></div></div>
                       <div className="col-span-2 p-2"><Button>Reply</Button></div>
                            </div>
                        )):<div>No notifications</div>
                    }
            </div>
        </div>
    )
}