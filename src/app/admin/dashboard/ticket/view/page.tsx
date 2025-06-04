/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Button } from "@/components/ui/button";
import { date, fetcher } from "@/services/services";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import useSWR from "swr";

export type Ticket = {
    tickets:{
    id: number;
    issue: string;
    createdAt: Date;
    updatedAt: Date;
    status: string;
},
    users_table: {
        name: string
    }

}

export default function Ticketing(){
    let notify: Ticket[] = []
    const { data, error } = useSWR("/api/tickets", fetcher);
    if(data){
        notify = data
    }
    if (!data) return <div className="flex p-6 bg-background rounded-md justify-center items-center mt-2"><Loader2 className="animate-spin"/></div>;

    const today = new Date()

    function status(status: string){
        if(status == "open"){
            return 'text-xs p-2 rounded-full text-green-600 dark:text-black bg-green-100 dark:bg-green-600 uppercase float-right'
        } else {
            return 'text-xs p-2 rounded-full text-gray-700 bg-gray-100 dark:bg-muted uppercase float-right'
        }
    }
    return (
        <div className="sm:p-6 p-2 bg-background rounded-lg mt-2">
            <div className="flex justify-between items-center">
            <div className="text-2xl font-bold tracking-tight">Tickets</div>
            <div className="h-10 w-10 bg-primary text-md text-muted font-bold rounded-full flex justify-center items-center ">{notify.length}</div>
            </div>
            <div className="bg-secondary rounded-lg sm:p-6 p-4 my-2 admin">
            { notify.length>0?
                        notify.map((notes, index) => (
                            <div key={index} className="grid grid-cols-12 mb-1 gap-4">
                     <div className="col-span-1 h-10 w-10 bg-primary text-muted text-2xl rounded-full flex justify-center items-center ">{notes.users_table.name[0]}</div>
                     <div className="col-span-11 sm:p-6 p-4 mx-4 bg-background rounded-lg flex justify-between">
                        <div className="w-5/6">
                     <div className="text-xs font-bold text-muted-foreground">Opened by: {notes.users_table.name}</div>
                       <div className="text-sm font-medium mt-3">{notes.tickets.issue}</div>
                       <div className="float-right text-xs text-muted-foreground p-2 font-bold">{date(notes.tickets.createdAt.toString())}</div>
                       </div>
                       <div>
                       <div className={status(notes.tickets.status)}>{notes.tickets.status}</div></div>
                       </div>
                            </div>
                        )):<div>No Tickets</div>
                    }
            </div>
            <div className="text-sm font-medium my-2 p-4 bg-secondary rounded">
            Would you like to 
            <Link href='/admin/dashboard/ticket' className="underline text-primary cursor-pointer"> open a ticket</Link> instead?<br/> Tickets can only be closed by support after the issue explaind in the ticket has been resolved.</div>
        </div>
    )
}