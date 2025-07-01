/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Button } from "@/components/ui/button";
import { date, fetcher } from "@/services/services";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import useSWR from "swr";
import CloseTicketing from "./closeTicket";
import { TicketCard } from "./ticketCard";

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
                            <div key={index}>
                                <TicketCard {...notes}/>
                            </div>
                        )):<div>No Tickets</div>
                    }
            </div>
            <div className="text-sm font-medium my-2 p-6 bg-secondary rounded">
            Would you like to 
            <Link href='/admin/dashboard/ticket' className="underline text-primary cursor-pointer"> open a ticket</Link> instead?<br/> Tickets can only be closed by support after the issue explaind in the ticket has been resolved.</div>
        </div>
    )
}